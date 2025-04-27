"use client";

import { useEffect } from "react";

// Send heartbeats at the configured interval
const HEARTBEAT_INTERVAL_HOURS = process.env.NEXT_PUBLIC_HEARTBEAT_INTERVAL_HOURS ?? 6;

export default function HeartBeat() {
    useEffect(() => {
        const heartBeatInterval = setInterval(async () => {
            try {
                await fetch('/api/heartbeat');
            } catch (error) {
                console.error("Heartbeat request error:", error);
            }
        }, HEARTBEAT_INTERVAL_HOURS * (60 * 60 * 1000));

        // cleanup interval when the component unmounts
        return () => clearInterval(heartBeatInterval);
    }, []);

    return null;
}
