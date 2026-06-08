const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  // 1. Admin Settings
  await prisma.adminSettings.upsert({
    where: { id: 'global-settings' },
    update: {},
    create: {
      id: 'global-settings',
      email: 'info@softezm.com',
      password: 'Yaddda123!',
      theme: 'dark',
      currency: 'Rs.',
    },
  });

  // 2. Sample Products
  const products = [
    {
      name: 'iPhone 15 Pro Max',
      brand: 'Apple',
      model: 'A3106',
      price: 1299,
      quantity: 15,
      storage: '256GB',
      color: 'Natural Titanium',
      category: 'phone',
    },
    {
      name: 'Samsung S24 Ultra',
      brand: 'Samsung',
      model: 'SM-S928B',
      price: 1199,
      quantity: 12,
      storage: '512GB',
      color: 'Titanium Gray',
      category: 'phone',
    },
    {
      name: 'Google Pixel 8 Pro',
      brand: 'Google',
      model: 'GC3VE',
      price: 999,
      quantity: 8,
      storage: '128GB',
      color: 'Bay Blue',
      category: 'phone',
    },
    {
      name: 'AirPods Pro 2',
      brand: 'Apple',
      model: 'A2698',
      price: 249,
      quantity: 25,
      category: 'accessory',
    },
    {
      name: 'Anker 737 Power Bank',
      brand: 'Anker',
      model: 'A1289',
      price: 149,
      quantity: 20,
      category: 'accessory',
    },
    {
      name: 'Spigen Tough Armor',
      brand: 'Spigen',
      model: 'IP15P-TA',
      price: 35,
      quantity: 50,
      category: 'accessory',
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  // 3. Sample Owners
  const owners = [
    {
      name: 'John Doe',
      storeName: 'John Mobile Center',
      email: 'john@example.com',
      password: 'password123',
      phone: '03001234567',
      subscriptionStatus: 'active',
      lastPaymentAmount: 5000,
      nextPaymentAmount: 5000,
      nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      name: 'Alice Smith',
      storeName: 'Alice Gadget World',
      email: 'alice@example.com',
      password: 'password123',
      phone: '03007654321',
      subscriptionStatus: 'pending',
      lastPaymentAmount: 0,
      nextPaymentAmount: 5000,
      nextPaymentDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    },
  ];

  for (const owner of owners) {
    await prisma.owner.create({ data: owner });
  }

  // 4. Sample Sales
  const sale1 = await prisma.sale.create({
    data: {
      total: 1334,
      subtotal: 1299,
      tax: 35,
      discount: 0,
      paymentMethod: 'cash',
      customerName: 'Ahmad Khan',
      items: {
        create: [
          { name: 'iPhone 15 Pro Max', price: 1299, quantity: 1 }
        ]
      }
    }
  });

  const sale2 = await prisma.sale.create({
    data: {
      total: 284,
      subtotal: 284,
      tax: 0,
      discount: 0,
      paymentMethod: 'card',
      customerName: 'Sara Ali',
      items: {
        create: [
          { name: 'AirPods Pro 2', price: 249, quantity: 1 },
          { name: 'Spigen Tough Armor', price: 35, quantity: 1 }
        ]
      }
    }
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
