/** @type {import('next').NextConfig} */
require('dotenv').config();


const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"],
    },
    env: {
        GOOGLE_MAPS_API_KEY: process.env.GOOGLE_API_KE
    }
}

module.exports = nextConfig
