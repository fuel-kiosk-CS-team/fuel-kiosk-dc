import localforage from "localforage";

localforage.config({
  name: "auth-storage",
});

// export async function saveSessionOffline(session) {
//   await localforage.setItem("user-session", session);
// }

// export async function getSessionOffline() {
//   return await localforage.getItem("user-session");
// }

export const saveSessionOffline = async (session) => {
    try {
        await localforage.setItem('offlineSession', session);
    } catch (error) {
        console.error("Error saving session offline:", error);
    }
};

export const getSessionOffline = async () => {
    try {
        return await localforage.getItem('offlineSession');
    } catch (error) {
        console.error("Error retrieving offline session:", error);
        return null;
    }
};

export const clearSessionOffline = async () => {
    try {
        await localforage.removeItem('offlineSession');
    } catch (error) {
        console.error("Error clearing offline session:", error);
    }
};