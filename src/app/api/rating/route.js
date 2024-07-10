import { NextResponse } from 'next/server';
import prisma from '../../../libs/prisma';
import { getUser } from '../../../../actions/getUser';

export async function POST(req) {

        const currentUser = await getUser();

        if (!currentUser) {
            return NextResponse.error();
        }

        const body = await req.json();
        const { comment, rating, product, userId } = body;


        const deliveredOrder = currentUser?.orders.some(order =>
            order.products.some(item => item.id === product.id) && order.deliveredStatus === 'delivered'
        );

        const userReview = product?.reviews.find(review => review.userId === currentUser.id);

        if(userReview || !deliveredOrder){
            return NextResponse.error()
        }

        const review = await prisma?.review.create({
            data: {
                comment,
                rating,
                productId: product.id,
                userId: currentUser.id,
            },
        });

        return NextResponse.json(review);
    } 
     
