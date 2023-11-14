/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"],
    },

}

module.exports = nextConfig;
