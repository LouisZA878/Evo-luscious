/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: process.env.PRODUCTS_PROTOCALL,
            hostname: process.env.PRODUCTS_HOST,
            port: process.env.PRODUCTS_PORT
        }]
    }
};

export default nextConfig;
