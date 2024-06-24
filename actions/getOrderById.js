
import prisma from '../src/libs/prisma';

export default async function getOrderById(orderId) {
    try {
        if (!orderId) {
            throw new Error('Order ID is required');
        }

        const order = await prisma.order.findUnique({
            where: {
                id: orderId,
            },
        });

        if (!order) return null;
        return order;
    } catch (error) {
        throw new Error(error.message || 'Error fetching order');
    }
}

  


