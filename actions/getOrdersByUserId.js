import prisma from "../src/libs/prisma";


export default async function getOrdersByUserId(userId){
    try {
         const orders = await prisma.order.findMany({
            include:{
                user: true
            },
            orderBy: {
                createdAt: 'desc', 
            },
            where: {
                userId: userId
            }
         })
         return orders
    } catch (error) {
        throw new Error(error)
    }
}