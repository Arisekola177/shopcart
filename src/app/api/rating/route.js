
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

    const { comment, rating, productId } = body;

    if (!comment || !rating || !productId) {
        console.error("Missing required fields:", { comment, rating, productId });
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const deliveredOrder = currentUser.orders.some(order => 
        order.products.some(item => item.id === productId) && order.deliveredStatus === 'delivered'
    );

    const userReview = await prisma.review.findFirst({
        where: {
            userId: currentUser.id,
            productId: productId,
        }
    });

    console.log("User Review:", userReview); 

    if (userReview || !deliveredOrder) {
        console.error("User has already reviewed or order not delivered");
        return NextResponse.json({ error: 'User has already reviewed or order not delivered' }, { status: 400 });
    }

    try {
        const review = await prisma.review.create({
            data: {
                comment,
                rating,
                productId,
                userId: currentUser.id,
            },
        });

        return NextResponse.json(review);
    } catch (error) {
        console.error("Error creating review:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
