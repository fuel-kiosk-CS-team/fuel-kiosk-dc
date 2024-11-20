// import localFont from "next/font/local";
import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript} from "@mantine/core";
import '@mantine/core/styles.css';

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata = {
  title: "Fuel Kiosk -- Tester",
  description: "Oregon State University Transportation Motorpool Bulk Fuel Kiosk",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <head>
        <ColorSchemeScript/>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head> */}
      <body
        // Honestly no idea how else to center everything, change if you can lmao
        style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)', width:"100dvw"}}
      >
        <MantineProvider defaultColorScheme="dark">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
