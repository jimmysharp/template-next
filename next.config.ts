import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['localhost', '127.0.0.1'],
  reactStrictMode: true,
  reactCompiler: true,
  typedRoutes: true,
  cacheComponents: true,
  serverExternalPackages: ['pino', 'transport-stream'],
  poweredByHeader: false,
  experimental: {
    turbopackRustReactCompiler: true,
  },
};

export default nextConfig;
