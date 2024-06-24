

import prisma from '../src/libs/prisma'

export default async function getProduct(params = {}) { 
    try {
        const { category, searchTerm } = params;
        let searchString = searchTerm || '';

        let query = {};

        if (category) {
            query.category = category;
        }

        const products = await prisma.product.findMany({
            where: {
                ...query,
                OR: [
                    {
                        name: {
                            contains: searchString,
                            mode: 'insensitive'
                        },
                        description: {
                            contains: searchString,
                            mode: 'insensitive'
                        }
                    }
                ]
            },
            include: {
                review: {
                    include: {
                        user: true,
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        });
        return products;
    } catch (error) {
        throw new Error(error.message);
    }
}

