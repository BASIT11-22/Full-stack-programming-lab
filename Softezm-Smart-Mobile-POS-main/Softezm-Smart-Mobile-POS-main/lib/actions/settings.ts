'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getAdminSettings() {
  try {
    const settings = await prisma.adminSettings.findFirst();
    if (!settings) {
      return await prisma.adminSettings.create({
        data: {},
      });
    }
    return settings;
  } catch (error) {
    console.error('Error fetching admin settings:', error);
    return null;
  }
}

export async function updateAdminSettings(data: any) {
  try {
    const settings = await prisma.adminSettings.upsert({
      where: { id: 'global-settings' },
      update: data,
      create: { id: 'global-settings', ...data },
    });
    revalidatePath('/admin/settings');
    revalidatePath('/settings');
    revalidatePath('/');
    return settings;
  } catch (error) {
    console.error('Error updating admin settings:', error);
    throw new Error('Failed to update admin settings');
  }
}
