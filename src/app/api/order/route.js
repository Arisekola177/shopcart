// /pages/api/order.js
import { NextResponse } from 'next/server';
import prisma from '../../../libs/prisma';

export const PUT = async (request) => {
  try {
    const { id, deliveryStatus } = await request.json();

    const updatedOrder = await prisma.order.update({
      where: { id: id },
      data: { deliveredStatus: deliveryStatus },
    });

    return NextResponse.json({
      message: 'Order updated successfully',
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
