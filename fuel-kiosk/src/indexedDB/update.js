/**
 * 
 * @param {*} transaction 
 */

export async function addTransaction(transaction) {
  const db = await dbPromise;
  await db.add('transactions', transaction);  // Fails if the key already exists
}

/**
 * 
 * @returns 
 */
export async function getAllTransactionsFromIDB() {
  const db = await dbPromise;
  return db.getAll('transactions');
}

/**
 * 
 */
export async function clearAllTransactions() {
  const db = await dbPromise;
  await db.clear('transactions');
}
