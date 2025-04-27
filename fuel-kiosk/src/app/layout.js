import React from 'react';
import { MantineProvider, Center } from "@mantine/core";
import '@mantine/core/styles.css';
import { FuelFlowProvider } from "./components/context/FuelFlowProvider"

import HeartBeat from './components/heartbeat/HeartBeat';

import classes from './app.module.css';

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
    },

  };

  export const viewport = {
    themeColor: "#FFFFFF",
  };



export default function RootLayout({ children }) {

    return (
        <html lang="en">
            <HeartBeat />
            <body className={classes.base} >
              <FuelFlowProvider>
                <MantineProvider defaultColorScheme="dark">
                    <Center className={classes.center}>
                        {children}
                    </Center>
                </MantineProvider>
              </FuelFlowProvider>
            </body>
        </html>
    );
}
