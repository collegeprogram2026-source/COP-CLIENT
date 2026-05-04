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
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "logo.clearbit.com" },
    ],
  },
  async redirects() {
    const cmsUrl = process.env.CMS_URL || "http://localhost:3001";
    return [
      {
        source: "/admin",
        destination: `${cmsUrl}/admin`,
        permanent: false,
      },
      {
        source: "/admin/:path*",
        destination: `${cmsUrl}/admin/:path*`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
