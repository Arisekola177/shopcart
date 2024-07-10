// import { NextResponse } from 'next/server';
// import prisma from '../../../libs/prisma';
// import { getUser } from '../../../../actions/getUser';

// export async function POST(req) {

//         const currentUser = await getUser();

//         if (!currentUser) {
//             return NextResponse.error();
//         }

//         const body = await req.json();
//         const { comment, rating, product, userId } = body;


//         const deliveredOrder = currentUser?.orders.some(order =>
//             order.products.some(item => item.id === product.id) && order.deliveredStatus === 'delivered'
//         );

//         const userReview = product?.reviews.find(review => review.userId === currentUser.id);

//         if(userReview || !deliveredOrder){
//             return NextResponse.error()
//         }

//         const review = await prisma?.review.create({
//             data: {
//                 comment,
//                 rating,
//                 productId: product.id,
//                 userId: currentUser.id,
//             },
//         });

//         return NextResponse.json(review);
//     } 
     

import { NextResponse } from 'next/server';
import prisma from '../../../libs/prisma';
import { getUser } from '../../../../actions/getUser';

export async function POST(req) {
    try {
        const currentUser = await getUser();

        if (!currentUser) {
            console.error("User not authenticated");
            return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
        }

        const body = await req.json();
        console.log('Received body:', body);

        const { comment, rating, product, userId } = body;

        const deliveredOrder = currentUser?.orders.some(order =>
            order.products.some(item => item.id === product.id) && order.deliveredStatus === 'delivered'
        );

        if (!deliveredOrder) {
            console.error("Product not delivered to user");
            return NextResponse.json({ error: 'Product not delivered to user' }, { status: 400 });
        }

        const userReview = product?.reviews.find(review => review.userId === currentUser.id);

        if (userReview) {
            console.error("User has already reviewed this product");
            return NextResponse.json({ error: 'User has already reviewed this product' }, { status: 400 });
        }

        const review = await prisma.review.create({
            data: {
                comment,
                rating,
                productId: product.id,
                userId: currentUser.id,
            },
        });

        console.log('Review created:', review);
        return NextResponse.json(review);

    } catch (error) {
        console.error("Error creating review:", error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}

