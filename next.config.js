/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      // Add any other domains you're using for course images as additional objects in this array
    ],
    dangerouslyAllowSVG: true,
  },
  // ... other configurations
};

export default config;
