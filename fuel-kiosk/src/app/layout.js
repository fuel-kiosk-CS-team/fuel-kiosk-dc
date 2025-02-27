import React from 'react';
import { MantineProvider, Center } from "@mantine/core";
import '@mantine/core/styles.css';

import classes from './app.module.css';

export const metadata = {
    title: "Fuel Kiosk -- Tester",
    description: "Oregon State University Transportation Motorpool Bulk Fuel Kiosk",
    generator: "Next.js",
    manifest: "/manifest.json",
    // themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
    // viewport:
    // "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
    icons: [
        {rel: "apple-touch-icon" , url: "apple-touch-icon.png"},
        {rel: "icon", url: "icon-192x192.png"},
    ],
};

export const viewport = {
    themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={classes.base} >
                <MantineProvider defaultColorScheme="dark">
                    <Center className={classes.center}>
                        {children}
                    </Center>
                </MantineProvider>
            </body>
        </html>
    );
}
