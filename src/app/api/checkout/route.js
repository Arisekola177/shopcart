
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '../../../libs/prisma';
import { getUser } from '../../../../actions/getUser';

export const POST = async (request) => {
  const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY);
  const currentUser = await getUser();

  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { items, email,  deliveryInfo } = await request.json();

    console.log(items)
   
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(item.price * 100), 
        product_data: {
          name: item.name,
          description: item.description,
          images: [item.selectedImage.image]
        },
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'https://shopcart-coral.vercel.app/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://shopcart-coral.vercel.app/cancel',
      metadata: {
        email,
       
      },
    });

    const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);

    const order = await prisma.order.create({
      data: {
        currency: 'usd',
        status: 'success',
        deliveredStatus: 'pending',
        address: deliveryInfo,
        userId: currentUser.id,
        amount: totalAmount,
        products: items.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          category: item.category,
          quantity: item.quantity,
          amount: item.price,
          inStock: item.inStock || true,
          selectedImage: item.selectedImage,
          brand: item.brand || '',
          reviews: 'pending' 
        })),
        sessionId: session.id,
      },
    });
    

    return NextResponse.json({
      message: 'Connection alive',
      success: true,
      order,
      id: session.id,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};



