import prisma from "../src/libs/prisma";


export default async function getOrders(){
    try {
         const orders = await prisma.order.findMany({
            include:{
                user: true
            },
            orderBy: {
                createdAt: 'desc', 
            }
         })
         return orders
    } catch (error) {
        throw new Error(error)
    }
}