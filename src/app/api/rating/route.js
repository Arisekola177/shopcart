import { NextResponse } from 'next/server';
import prisma from '../../../libs/prisma';
import { getUser } from '../../../../actions/getUser';


export async function POST(req){
    const currentUser = await getUser();


    if(!currentUser){
        return NextResponse.error()
    }

    const body = await req.json()

    const {comment, rating, product, userId} = body;

    const deliveredOrder = currentUser.order.some(order => order.products.find(item =>item.id === product.id )
     && order.deliveryStatus === 'delivered')


     const userReview = product.review.find(((review) => {
        return review.userId === currentUser.id
     }))


     if(userReview || !deliveredOrder){
        return NextResponse.error()
     }


     const review = await prisma.review.create({
        data: {
            comment,
            rating,
            productId: product.id,
            userId
        }
     })

     return NextResponse.json(review)
}



  
