import localforage from "localforage";

localforage.config({
  name: "auth-storage",
});

export async function saveSessionOffline(session) {
  await localforage.setItem("user-session", session);
}

export async function getSessionOffline() {
  return await localforage.getItem("user-session");
}