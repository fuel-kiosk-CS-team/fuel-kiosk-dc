import React from 'react';
import { MantineProvider, Center } from "@mantine/core";
import '@mantine/core/styles.css';
// import {metadata} from "/fuel-kiosk-dc/fuel-kiosk/src/app/manifest"

import classes from './app.module.css';
// import manifest from './manifest';


// export const viewport = {
//     themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
// }

const APP_NAME = "PWA APP"
const APP_DEFAULT_TITLE = "OSU FUEL KIOSK"
const APP_TITLE_TEMPLATE = "%s - Fuel Kiosk"
const APP_DESCRIPTION = "OSU Transportation Services Fuel Kiosk App"
export const metadata = {
    applicationName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    manifest: "/manifest.json",
    category: "website",
    generator: "Next.js",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: APP_DEFAULT_TITLE,
      // startUpImage: [],
    },
    
  };
  
  export const viewport = {
    themeColor: "#FFFFFF",
  };



export default function RootLayout({ children }) {

    return (
        <html lang="en">
            <head>
            {/* <link rel="manifest" href="/manifest.json"></link> */}
            </head>
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
