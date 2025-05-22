const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
  } = require("next/constants");
  
  /** @type {(phase: string, defaultConfig: import("next").NextConfig) => Promise<import("next").NextConfig>} */
  module.exports = async (phase) => {
    /** @type {import("next").NextConfig} */

    // Basic nextConfig
    const nextConfig = {
      reactStrictMode: true,
      compiler: {
        removeConsole: process.env.NODE_ENV !== "development",
      },
    };

    /**
     * You may be wondering whether this is important, YES it is.
     * It ensures that the service worker will see a new revision 
     * for the "/~offline" route every time the config is rebuilt. 
     * This forces the service worker to re-cache that route, helping 
     * to ensure users always get the latest version of the offline 
     * page after a new deployment.
     */
    const revision = crypto.randomUUID();

    // Basically just check if it's even worth setting up the service worker.
    if (
      phase === PHASE_DEVELOPMENT_SERVER ||
      phase === PHASE_PRODUCTION_BUILD
    ) {
      const withSerwist = (await import("@serwist/next")).default({
        cacheOnNavigation: true,
        swSrc: "public/app-worker.ts",
        swDest: "public/sw.js",
        reloadOnOnline: true,
        additionalPrecacheEntries: [{ url: "/~offline", revision }],
      });
      return withSerwist(nextConfig);
    }

    return nextConfig;
  };

  
  





