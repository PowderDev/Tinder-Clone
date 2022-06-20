/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "",
    domains: [
      "vectorified.com",
      "localhost",
      "images.unsplash.com",
      "loading.io",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
