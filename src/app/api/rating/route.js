import { NextResponse } from "next/server";
import { getUser } from "../../../../actions/getUser";
import prisma from "../../../libs/prisma";

export async function POST(req){
    const currentUser = getUser()


    if(!currentUser){
        return NextResponse.error()
    }



    const body = await req.json()

    const {comment, rating, product, userId} = body;


    const deliveredOrder = currentUser?.orders.some(order => 
     order.products.find(item => item.id === product.id ) && order.deliverStatus === 'delivered')

    const userReview = product?.reviews.find((review) => {
        return review.userId === currentUser.id
    })

    if(userReview || !deliveredOrder){
        return NextResponse.error()
    }


    const review = await prisma.review.create({
        data: {
            comment,
            rating,
            productId: product.id,
            userId: currentUser.id
        }
    })

    return NextResponse.json(review)
}