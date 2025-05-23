"use client";

import { useEffect } from "react";

// Send heartbeats at the configured interval
const HEARTBEAT_INTERVAL_HOURS = process.env.NEXT_PUBLIC_HEARTBEAT_INTERVAL_HOURS ?? 6;

// Component to periodically send heartbeat signals to server
export default function HeartBeat() {
    useEffect(() => {
        // Set up recurring heartbeat
        const heartBeatInterval = setInterval(async () => {
            try {
                await fetch('/api/heartbeat');
            } catch (error) {
                console.error("Heartbeat request error:", error);
            }
        }, HEARTBEAT_INTERVAL_HOURS * (60 * 60 * 1000)); // Convert hours to milliseconds

        // cleanup interval when the component unmounts
        return () => clearInterval(heartBeatInterval);
    }, []);

    // Render nothing - this is a background service component
    return null;
}
