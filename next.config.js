/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
        ],
    },

}

module.exports = nextConfig;
