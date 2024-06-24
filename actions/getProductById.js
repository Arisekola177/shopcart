import prisma from '../src/libs/prisma'


export default async function getProductById(productId){
    try {
            const product = await prisma.product.findUnique({
                where: {
                    id: productId,
                },
                include: {
                    review: {
                        include: {
                            user: true
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }
                    }
                }
            });
    
            if (!product) return null;
            return product;

        
    } catch (error) {
        throw new Error(error)
    }
}