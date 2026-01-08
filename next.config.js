/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Si estás exportando estático:
  output: "export",
  images: { unoptimized: true },

  // ✅ Evita que ESLint rompa/ensucie el build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
