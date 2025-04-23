"use client";

import { useEffect } from "react";

const HEARTBEAT_INTERVAL_MINUTES = 0.1;

export default function HeartBeat() {
    useEffect(() => {
        const heartBeatInterval = setInterval(async () => {
            try {
                await fetch('/api/heartbeat');
            } catch (error) {
                console.error("Heartbeat request error:", error);
            }
        }, HEARTBEAT_INTERVAL_MINUTES * (60 * 1000));

        // cleanup interval when the component unmounts
        return () => clearInterval(heartBeatInterval);
    }, []);

    return null;
}
