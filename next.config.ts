import type { NextConfig } from "next";

module.exports = {
  env: {
    NEXT_PUBLIC_STRIPE_PK: process.env.NEXT_PUBLIC_STRIPE_PK,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
  }
}
const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
