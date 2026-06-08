'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getSales() {
  try {
    return await prisma.sale.findMany({
      include: { items: true },
      orderBy: { timestamp: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching sales:', error);
    return [];
  }
}

export async function recordSale(data: any) {
  try {
    const sale = await prisma.$transaction(async (tx) => {
      // 1. Create the sale
      const newSale = await tx.sale.create({
        data: {
          total: data.total,
          subtotal: data.subtotal,
          tax: data.tax,
          discount: data.discount,
          paymentMethod: data.paymentMethod,
          customerName: data.customerName,
          pendingAmount: data.pendingAmount || 0,
          dueDate: data.dueDate,
          items: {
            create: data.items.map((item: any) => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            })),
          },
        },
      });

      // 2. Update product quantities
      for (const item of data.items) {
        await tx.product.update({
          where: { id: item.id },
          data: {
            quantity: {
              decrement: item.quantity,
            },
          },
        });
      }

      return newSale;
    });

    revalidatePath('/sales/pos');
    revalidatePath('/sales/pending');
    revalidatePath('/');
    revalidatePath('/inventory/phones');
    revalidatePath('/inventory/accessories');
    return sale;
  } catch (error) {
    console.error('Error recording sale:', error);
    throw new Error('Failed to record sale');
  }
}

export async function updateSaleStatus(id: string, method: string) {
  try {
    const sale = await prisma.sale.update({
      where: { id },
      data: {
        paymentMethod: method,
        pendingAmount: 0,
      },
    });
    revalidatePath('/sales/pending');
    revalidatePath('/');
    return sale;
  } catch (error) {
    console.error('Error updating sale status:', error);
    throw new Error('Failed to update sale status');
  }
}

export async function makePartialPayment(id: string, amount: number) {
  try {
    const currentSale = await prisma.sale.findUnique({ where: { id } });
    if (!currentSale) throw new Error('Sale not found');

    const newPendingAmount = Math.max(0, (currentSale.pendingAmount || 0) - amount);
    const updateData: any = { pendingAmount: newPendingAmount };

    if (newPendingAmount <= 0) {
      updateData.paymentMethod = 'cash';
    }

    const sale = await prisma.sale.update({
      where: { id },
      data: updateData
    });

    revalidatePath('/sales/pending');
    revalidatePath('/');
    return sale;
  } catch (error) {
    console.error('Error making partial payment:', error);
    throw new Error('Failed to update partial payment');
  }
}
