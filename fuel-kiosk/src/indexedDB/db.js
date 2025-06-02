import { openDB } from 'idb';

const dbPromise = openDB('fuel-db', 1, {
  upgrade(db) {
    db.createObjectStore('transactions', { keyPath: 'id' });
  }
});
