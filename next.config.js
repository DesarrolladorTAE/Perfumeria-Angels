/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // export estático
  output: "export",
  trailingSlash: true,          // ✅ CLAVE para que /tienda/ funcione

  images: { unoptimized: true },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
