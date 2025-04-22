"use client";

import { useEffect } from "react";

const DEFAULT_TIME = 6000; // 6 seconds

export default function HeartBeat() {
    useEffect(() => {
        const heartBeatInterval = setInterval(async () => {
            try {
                await fetch('/api/heartbeat');
            } catch (error) {
                console.error("Heartbeat request error:", error);
            }
        }, DEFAULT_TIME);

        // cleanup interval when the component unmounts
        return () => clearInterval(heartBeatInterval);
    }, []);

    return null;
}
