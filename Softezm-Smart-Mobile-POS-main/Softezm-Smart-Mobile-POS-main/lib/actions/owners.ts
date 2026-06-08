'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getOwners() {
  try {
    return await prisma.owner.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching owners:', error);
    return [];
  }
}

export async function addOwner(data: any) {
  try {
    console.log('Attempting to add owner:', data);
    const owner = await prisma.owner.create({
      data: {
        name: data.name,
        storeName: data.storeName || '',
        email: data.email,
        password: data.password,
        phone: data.phone,
        subscriptionStatus: data.subscriptionStatus,
        lastPaymentAmount: parseFloat(data.lastPaymentAmount) || 0,
        nextPaymentAmount: parseFloat(data.nextPaymentAmount) || 0,
        nextPaymentDate: new Date(data.nextPaymentDate),
      },
    });
    revalidatePath('/admin/owners');
    return owner;
  } catch (error: any) {
    console.error('DATABASE ERROR (addOwner):', error.message || error);
    throw new Error(error.message || 'Failed to add owner');
  }
}

export async function updateOwner(id: string, data: any) {
  try {
    const owner = await prisma.owner.update({
      where: { id },
      data: {
        ...data,
        lastPaymentAmount: data.lastPaymentAmount ? parseFloat(data.lastPaymentAmount) : undefined,
        nextPaymentAmount: data.nextPaymentAmount ? parseFloat(data.nextPaymentAmount) : undefined,
        nextPaymentDate: data.nextPaymentDate ? new Date(data.nextPaymentDate) : undefined,
      },
    });
    revalidatePath('/admin/owners');
    return owner;
  } catch (error) {
    console.error('Error updating owner:', error);
    throw new Error('Failed to update owner');
  }
}

export async function deleteOwner(id: string) {
  try {
    await prisma.owner.delete({
      where: { id },
    });
    revalidatePath('/admin/owners');
  } catch (error) {
    console.error('Error deleting owner:', error);
    throw new Error('Failed to delete owner');
  }
}
