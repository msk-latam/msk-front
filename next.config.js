const withNextIntl = require("next-intl/plugin")("./i18n.ts");
/** @type {import('next').NextConfig} */

const nextConfig = {
  async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*', // Update this with your frontend URL
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, POST, PUT, DELETE, OPTIONS',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-Requested-With, Content-Type, Authorization',
                    },
                ],
            },
        ]
    },
  // These are all the locales you want to support in
  // your application
  //output: 'export', //For static site (loses SSR cappabilites)
  //distDir: "dist",
  reactStrictMode: false,
  trailingSlash: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wp.msklatam.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dev.msklatam.tech",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
