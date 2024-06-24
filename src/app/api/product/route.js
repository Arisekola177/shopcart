

import { NextResponse } from 'next/server';
import prisma from '../../../libs/prisma';
import { getUser } from '../../../../actions/getUser';

export async function POST(req) {

    const currentUser = await getUser()

    if(!currentUser || currentUser.role !== 'ADMIN'){
        return NextResponse.error();
    }
  try {
    const body = await req.json();

    const { name, brand, description, category, inStock, images, price } = body;

    const formattedImages = images.map(image => ({
      color: image.color,
      colorCode: image.colorCode,
      image: image.image
    }));

    const product = await prisma.product.create({
      data: {
        name,
        brand,
        description,
        category,
        inStock,
        images: formattedImages,
        price: parseFloat(price) 
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
}



export async function PUT(req) {
    try {
      const { id, inStock } = await req.json(); 
      const updatedProduct = await prisma.product.update({
        where: { id },
        data: { inStock },
      });
      return NextResponse.json(updatedProduct); 
    } catch (error) {
      console.error('Error updating product:', error);
      return NextResponse.error(); 
    }
  }