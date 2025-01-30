import React from 'react';
import { MantineProvider, Center } from "@mantine/core";
import '@mantine/core/styles.css';

export const metadata = {
    title: "Fuel Kiosk -- Tester",
    description: "Oregon State University Transportation Motorpool Bulk Fuel Kiosk",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body style={{ margin: 0, height: "100dvh", width: "100dvw" }} >
                <MantineProvider defaultColorScheme="dark">
                    <Center style={{ width: "100%", height: "100%" }}>
                        {children}
                    </Center>
                </MantineProvider>
            </body>
        </html>
    );
}
