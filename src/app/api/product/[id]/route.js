// import { NextResponse } from 'next/server';
// import prisma from '../../../../libs/prisma';
// import { getUser } from '../../../../../actions/getUser';

// export async function DELETE(req, { params }) {
//   try {
//     const currentUser = await getUser();

//     if (!currentUser || currentUser.role !== 'ADMIN') {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
//     }

//     const product = await prisma.product.delete({
//       where: { id: params.id },
//     });

//     return NextResponse.json(product);
//   } catch (error) {
//     console.error('Error deleting product:', error);

//     // Check if the error is caused by the product not being found
//     if (error.code === 'P2025') {
//       return NextResponse.json({ error: 'Product not found' }, { status: 404 });
//     }

//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import prisma from '../../../../libs/prisma';
import { getUser } from '../../../../../actions/getUser';

// Config to ensure the body parser is enabled
export const config = {
  api: {
    bodyParser: true,
  },
};

export async function DELETE(req, { params }) {
  try {
    const currentUser = await getUser();

    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const productId = params.id; // Ensure this matches your dynamic route parameter

    const product = await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error deleting product:', error);

    // Check if the error is caused by the product not being found
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}



