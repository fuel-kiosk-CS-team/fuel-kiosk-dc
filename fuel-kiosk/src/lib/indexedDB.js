import { openDB } from "idb";

const DB_NAME = "authDB";
const STORE_NAME = "sessions";

export async function saveSession(session) {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME);
    },
  });
  await db.put(STORE_NAME, session, "sessionData");
}

export async function getSession() {
  const db = await openDB(DB_NAME, 1);
  return db.get(STORE_NAME, "sessionData");
}

export async function clearSession() {
  const db = await openDB(DB_NAME, 1);
  await db.delete(STORE_NAME, "sessionData");
}