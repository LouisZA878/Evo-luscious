/** @type {import('next').NextConfig} */

import BundleAnalyzer from "@next/bundle-analyzer";
const withBundleAnalyzer = BundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
    openAnalyzer: true
  })

const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: process.env.PRODUCTS_PROTOCALL,
            hostname: process.env.PRODUCTS_HOST,
            port: process.env.PRODUCTS_PORT
        }]
    },
    experimental: {
        optimizePackageImports: ['react-icons/*'],
    },
};

   
export default withBundleAnalyzer(nextConfig)