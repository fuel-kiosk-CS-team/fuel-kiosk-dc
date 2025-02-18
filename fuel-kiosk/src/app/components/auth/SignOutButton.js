'use client';

import { signOut, useSession } from "next-auth/react";
import { Button } from "@mantine/core";
import { logoutHandle } from "@/src/lib/actions";
import { useRouter } from "next/navigation";

export function SignOutButton() {

    const router = useRouter()

    const handleSignOut = async () => {
        const session = useSession();
        console.log("session",session)
        await logoutHandle();
        router.push('/')
    };
    return (
        <Button
            variant="gradient"
            gradient={{ from: 'red', to: 'orange', deg: 90 }}
            onClick={handleSignOut}
        >
            Sign Out
        </Button>
    );
}