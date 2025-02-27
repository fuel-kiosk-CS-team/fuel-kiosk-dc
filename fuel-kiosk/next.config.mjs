/** @type {import('next').NextConfig} */

// next.config.mjs
// Setting up PWA capabilities using next-pwa

import withPWAInit from 'next-pwa';

/** @type {import('next').NextConfig} */

const withPWA = withPWAInit({
    dest: "public",         // destination directory for the PWA files
    // disable: process.env.NODE_ENV === "development",        // disable PWA in the development environment
    register: true,         // register the PWA service worker
    skipWaiting: true,      // skip waiting for service worker activation
    reloadOnOnline: true,   // reload the ap when it has gone back online
    fallbacks: {
        // Failed page requests fallback to this - should have page.js file within this folder
        document: "/~offline",
        // This is for /_next/.../.json files.
        data: "/fallback.json",
        // images
        image: "/fallback.webp"
    }
})


const nextConfig = {
    reactStrictMode: true,      // Enable React strict mode for improved error handling
    swcMinify: true,            // Enable SWC minification for improved performance
    compiler: {
        removeConsole: process.env.NODE_ENV !== "development"     // Remove console.log in production
    }
};

export default withPWA({
    reactStrictMode: true,      // Enable React strict mode for improved error handling
    compiler: {
        removeConsole: process.env.NODE_ENV !== "development"     // Remove console.log in production
    }
});
// export default withPWA({
//     dest: "public",         // destination directory for the PWA files
//     disable: process.env.NODE_ENV === "development",        // disable PWA in the development environment
//     register: true,         // register the PWA service worker
//     skipWaiting: true,      // skip waiting for service worker activation
//     reloadOnOnline: true,   // reload the ap when it has gone back online
// })(nextConfig);



