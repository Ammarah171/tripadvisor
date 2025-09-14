// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },
// }

// module.exports = nextConfig


const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds to avoid blocking deployment
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during builds
  },
  images: {
    unoptimized: true, // Disable Next.js image optimization if needed
  },
  reactStrictMode: true, // Enable React Strict Mode for extra checks in development (recommended)
  swcMinify: true, // Enable SWC minification for faster build times
  output: "standalone", // Optimize for deployment as a standalone app (helps with Vercel or other environments)
  transpilePackages: ["some-package"], // If you need to transpile specific packages (optional)
}

module.exports = nextConfig
