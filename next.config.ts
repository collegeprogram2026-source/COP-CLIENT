import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@tabler/icons-react", "lucide-react"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "api.collegesathi.com" },
      { protocol: "https", hostname: "media.collegesathi.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async rewrites() {
    const cmsUrl = process.env.CMS_URL || "http://localhost:3001";
    return [
      {
        source: "/admin/:path*",
        destination: `${cmsUrl}/admin/:path*`,
      },
    ];
  },
};

export default nextConfig;
