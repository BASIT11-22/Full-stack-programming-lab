import { PrismaClient } from '@prisma/client'

try {
  const prisma = new PrismaClient({ log: ['query'] });
  console.log('Client instantiated successfully');
} catch (e: any) {
  require('fs').writeFileSync('error3.txt', e.toString() + '\n' + e.message + '\n' + e.stack);
}
