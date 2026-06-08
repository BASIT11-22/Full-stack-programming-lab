const { prisma } = require('./lib/prisma');

async function test() {
  try {
    const products = await prisma.product.findMany();
    console.log('Products:', products.length);
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
