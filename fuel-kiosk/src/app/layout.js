import React from 'react';
import { MantineProvider, Center } from "@mantine/core";
import '@mantine/core/styles.css';

import classes from './app.module.css';

export const metadata = {
    title: "Fuel Kiosk -- Tester",
    description: "Oregon State University Transportation Motorpool Bulk Fuel Kiosk",
};

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
