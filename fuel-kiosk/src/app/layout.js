import {React} from 'react';
import { MantineProvider, Center } from "@mantine/core";
import '@mantine/core/styles.css';
import AuthProvider from "../context/AuthProvider"
// /context/AuthProvider";

import classes from './app.module.css';



export const metadata = {
    title: "Fuel Kiosk -- Tester",
    description: "Oregon State University Transportation Motorpool Bulk Fuel Kiosk",
    icons: {
        icon: "/favicon-32x32.png",
        apple: "/apple-touch-icon.png",
        other: {
            rel: "favicon-16x16",
            url: "/favicon-16x16.png"
        }
    // Unsure of whether to include this or not, if so it would be :
    // manifest: '/site.webmanifest'
    // <link rel="manifest" href="/site.webmanifest"></link>
    }
};

export default function RootLayout({ children }) {

    // useEffect(() => {
    //     if ("serviceWorker" in navigator) {
    //         navigator.serviceWorker.register("/sw.js")
    //     }
    // }, []);


    return (
        <html lang="en">
            <body className={classes.base} >
                <AuthProvider>
                    <MantineProvider defaultColorScheme="dark">
                        <Center className={classes.center}>
                            {children}
                        </Center>
                    </MantineProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
