"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { saveSessionOffline, getSessionOffline } from "@/src/lib/storage";

export default function LoginPage() {
  const { data: session } = useSession();
  const [offlineSession, setOfflineSession] = useState(null);

  useEffect(() => {
    getSessionOffline().then(setOfflineSession);
  }, []);

  return (
    <div>
      {session ? (
        <>
          <p>Welcome, {session.user.username}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <>
          <button onClick={() => signIn("credentials")}>Sign In</button>
        </>
      )}
      {offlineSession && <p>Offline Session: {offlineSession.username}</p>}
    </div>
  );
}