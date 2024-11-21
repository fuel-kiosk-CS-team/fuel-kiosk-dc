/** @type {import('next').NextConfig} */
const nextConfig = {
  // Makes it so the base path is only given for GitHub Pages, not development environments
  basePath: process.env.NODE_ENV === 'development' ? '' : "/fuel-kiosk-dc",
  output: "export",
  reactStrictMode: true,
};

export default nextConfig;
