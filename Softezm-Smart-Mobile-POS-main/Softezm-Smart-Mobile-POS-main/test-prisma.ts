import 'dotenv/config';
import { prisma } from './lib/prisma';

async function test() {
  try {
    const products = await prisma.product.findMany();
    console.log('Success! Products count:', products.length);
  } catch (e: any) {
    console.error('Error in Prisma:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}
test();
