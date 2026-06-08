'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getRequests() {
  try {
    return await prisma.credentialRequest.findMany({
      orderBy: { timestamp: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching requests:', error);
    return [];
  }
}

export async function addRequest(data: any) {
  try {
    const request = await prisma.credentialRequest.create({
      data: {
        ownerId: data.ownerId,
        ownerName: data.ownerName,
        newEmail: data.newEmail,
        newPassword: data.newPassword,
        reason: data.reason,
        status: 'pending',
      },
    });
    revalidatePath('/admin/requests');
    revalidatePath('/alerts');
    return request;
  } catch (error) {
    console.error('Error adding request:', error);
    throw new Error('Failed to add request');
  }
}

export async function updateRequestStatus(id: string, status: string) {
  try {
    const request = await prisma.$transaction(async (tx) => {
      const updatedRequest = await tx.credentialRequest.update({
        where: { id },
        data: { status },
      });

      if (status === 'approved') {
        const req = await tx.credentialRequest.findUnique({ where: { id } });
        if (req) {
          await tx.owner.update({
            where: { id: req.ownerId },
            data: {
              email: req.newEmail || undefined,
              password: req.newPassword || undefined,
            },
          });
        }
      }

      return updatedRequest;
    });

    revalidatePath('/admin/requests');
    revalidatePath('/alerts');
    return request;
  } catch (error) {
    console.error('Error updating request status:', error);
    throw new Error('Failed to update request status');
  }
}
