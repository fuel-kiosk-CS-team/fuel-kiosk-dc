// Will have to modify sync for working with prisma a bit more

import { getAllTransactionsFromIDB } from './update';

export async function syncToServer() {
  const items = await getAllTransactionsFromIDB();

  for (const transaction of transactions) {
    await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction)
    });
  }
}