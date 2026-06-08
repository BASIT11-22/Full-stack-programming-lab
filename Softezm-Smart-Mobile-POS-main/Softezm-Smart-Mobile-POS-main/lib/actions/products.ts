'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getProducts() {
  try {
    return await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
}

export async function addProduct(data: any) {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        brand: data.brand,
        model: data.model,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity),
        storage: data.storage,
        color: data.color,
        category: data.category,
      },
    });
    revalidatePath('/inventory/phones');
    revalidatePath('/inventory/accessories');
    revalidatePath('/');
    return product;
  } catch (error) {
    console.error('Error adding product:', error);
    throw new Error('Failed to add product');
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    const { id: _, createdAt, updatedAt, ...editableData } = data;
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...editableData,
        price: editableData.price !== undefined ? parseFloat(editableData.price) : undefined,
        quantity: editableData.quantity !== undefined ? parseInt(editableData.quantity) : undefined,
      },
    });
    revalidatePath('/inventory/phones');
    revalidatePath('/inventory/accessories');
    revalidatePath('/');
    return product;
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product');
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath('/inventory/phones');
    revalidatePath('/inventory/accessories');
    revalidatePath('/');
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Failed to delete product');
  }
}
