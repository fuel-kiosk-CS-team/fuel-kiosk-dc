const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
  } = require("next/constants");
  
  /** @type {(phase: string, defaultConfig: import("next").NextConfig) => Promise<import("next").NextConfig>} */
  module.exports = async (phase) => {
    /** @type {import("next").NextConfig} */
  
  // Your current or future configuration 
  
    // const nextConfig = {
    //     reactStrictMode: true,      // Enable React strict mode for improved error handling
    //     compiler: {
    //         removeConsole: process.env.NODE_ENV !== "development"     // Remove console.log in production
    //     }  
        
    // };
    const nextConfig = {
        reactStrictMode: true,
        compiler: {
          removeConsole: process.env.NODE_ENV !== "development",
        },
        // async headers() {
        //   return [
        //     {
        //       source: "/manifest.json",
        //       headers: [{ key: "Content-Type", value: "application/json" }],
        //     },
        //   ];
        // },
      };
    const revision = crypto.randomUUID();
  
    if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
      const withSerwist = (await import("@serwist/next")).default({
        cacheOnNavigation: true,
        swSrc: "public/app-worker.ts",
        swDest: "public/sw.js",
        reloadOnOnline: true,
        // additionalPrecacheEntries: [{ url: "/~offline"}],
        additionalPrecacheEntries: [{ url: "/~offline", revision}],
      });
      return withSerwist(nextConfig);
    }
  
    return nextConfig;
  };

  
  





