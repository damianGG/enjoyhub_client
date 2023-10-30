/** @type {import('next').NextConfig} */
require('dotenv').config();


const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '2mb',
        }
    }
}

module.exports = nextConfig
