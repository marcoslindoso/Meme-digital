import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // Mantém o mesmo modo de metadados no servidor e no cliente durante o dev.
  // Em produção, o Next continua usando a lista padrão de bots para SEO.
  ...(isDevelopment ? { htmlLimitedBots: /a^/ } : {}),
  turbopack: { rules: { "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" } } },
};

export default nextConfig;
