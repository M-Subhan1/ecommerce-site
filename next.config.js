/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: ["localhost", "res.cloudinary.com"],
  },
  env: {
    STRAPI_URL: "http://localhost:8000",
  },
};
