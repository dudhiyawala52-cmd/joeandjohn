// Plain JavaScript on purpose: hosts with an older glibc (e.g. Hostinger) cannot load
// Next's native compiler, and the WebAssembly fallback cannot compile a next.config.ts.

/** @type {import("next").NextConfig} */
const nextConfig = {
  // A package-lock.json in the user home folder would otherwise be picked as the workspace root.
  turbopack: { root: process.cwd() },
  images: {
    // Serve every image exactly as supplied: no resizing or re-compression by Next.js.
    unoptimized: true,
    // Future: add the Shopify CDN and Builder.io image hosts here, e.g.
    // remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }, { protocol: "https", hostname: "cdn.builder.io" }],
  },
};

export default nextConfig;
