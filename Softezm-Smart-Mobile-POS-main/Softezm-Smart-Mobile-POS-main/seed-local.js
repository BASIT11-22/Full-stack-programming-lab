const { createClient } = require('@libsql/client');

const libsql = createClient({ url: 'file:./dev.db' });

function cuid() {
  return 'c' + Math.random().toString(36).substr(2, 24);
}

async function main() {
  console.log('Seeding data via LibSQL directly...');
  
  // 1. Admin Settings
  await libsql.execute(`
    INSERT OR IGNORE INTO AdminSettings (id, email, password, theme, currency)
    VALUES ('global-settings', 'info@softezm.com', 'Yaddda123!', 'dark', 'Rs.')
  `);

  const products = [
    { name: 'iPhone 15 Pro Max', brand: 'Apple', model: 'A3106', price: 1299, quantity: 15, storage: '256GB', color: 'Natural Titanium', category: 'phone' },
    { name: 'Samsung S24 Ultra', brand: 'Samsung', model: 'SM-S928B', price: 1199, quantity: 12, storage: '512GB', color: 'Titanium Gray', category: 'phone' },
    { name: 'Google Pixel 8 Pro', brand: 'Google', model: 'GC3VE', price: 999, quantity: 8, storage: '128GB', color: 'Bay Blue', category: 'phone' },
    { name: 'AirPods Pro 2', brand: 'Apple', model: 'A2698', price: 249, quantity: 25, storage: null, color: null, category: 'accessory' },
    { name: 'Anker 737 Power Bank', brand: 'Anker', model: 'A1289', price: 149, quantity: 20, storage: null, color: null, category: 'accessory' },
    { name: 'Spigen Tough Armor', brand: 'Spigen', model: 'IP15P-TA', price: 35, quantity: 50, storage: null, color: null, category: 'accessory' },
  ];

  for (const product of products) {
    const res = await libsql.execute({
      sql: 'SELECT * FROM Product WHERE name = ?',
      args: [product.name]
    });
    if (res.rows.length === 0) {
      const now = new Date().getTime();
      await libsql.execute({
        sql: 'INSERT INTO Product (id, name, brand, model, price, quantity, storage, color, category, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        args: [cuid(), product.name, product.brand, product.model, product.price, product.quantity, product.storage, product.color, product.category, now, now]
      });
    }
  }

  const owners = [
    {
      name: 'John Doe', storeName: 'John Mobile Center', email: 'john@example.com', password: 'password123', phone: '03001234567',
      subscriptionStatus: 'active', lastPaymentAmount: 5000, nextPaymentAmount: 5000,
      nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).getTime(),
    },
    {
      name: 'Alice Smith', storeName: 'Alice Gadget World', email: 'alice@example.com', password: 'password123', phone: '03007654321',
      subscriptionStatus: 'pending', lastPaymentAmount: 0, nextPaymentAmount: 5000,
      nextPaymentDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).getTime(),
    },
  ];

  for (const owner of owners) {
    const res = await libsql.execute({
      sql: 'SELECT * FROM Owner WHERE email = ?',
      args: [owner.email]
    });
    if (res.rows.length === 0) {
      const now = new Date().getTime();
      await libsql.execute({
        sql: 'INSERT INTO Owner (id, name, storeName, email, password, phone, subscriptionStatus, joinDate, lastPaymentDate, lastPaymentAmount, nextPaymentDate, nextPaymentAmount, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        args: [cuid(), owner.name, owner.storeName, owner.email, owner.password, owner.phone, owner.subscriptionStatus, now, now, owner.lastPaymentAmount, owner.nextPaymentDate, owner.nextPaymentAmount, now, now]
      });
    }
  }
  console.log('Seeding completed successfully via LibSQL directly!');
}

main().catch(console.error);

