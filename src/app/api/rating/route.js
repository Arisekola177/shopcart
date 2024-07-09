
import { NextResponse } from 'next/server';
import prisma from '../../../libs/prisma';
import { getUser } from '../../../../actions/getUser';

export async function POST(req) {
    const currentUser = await getUser();

    if (!currentUser) {
        console.error("User not authenticated");
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const body = await req.json();

    const { comment, rating, product } = body;

    const deliveredOrder = currentUser?.orders.some(order => 
        order.products.find(item => item.id === product.id) && order.deliveredStatus === 'delivered'
    );

    const userReview =  product?.reviews.find(((review) => {
        return review.userId === currentUser.id
    }));
 

    if (userReview || !deliveredOrder) {
        console.error("User has already reviewed or order not delivered");
        return NextResponse.error();
    }

    try {
        const review = await prisma.review.create({
            data: {
                comment,
                rating,
                productId: product.id,
                userId: currentUser.id,
            },
        });

        return NextResponse.json(review);
    } catch (error) {
        console.error("Error creating review:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
