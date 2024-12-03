/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Permitir apenas HTTPS
        hostname: "**", // Aceita todos os domínios
      },
      {
        protocol: "http", // Permitir HTTP (opcional)
        hostname: "**", // Aceita todos os domínios
      },
    ],
  },
};

export default nextConfig;
