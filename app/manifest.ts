import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CollegeProgram — Online Degree Programs from Top Universities",
    short_name: "CollegeProgram",
    description:
      "Discover online degree programs, universities, and courses. Compare options, talk to expert counselors, and find your perfect program.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b3d8c",
    icons: [
      { src: "/logo.webp", sizes: "192x192", type: "image/webp" },
      { src: "/logo.webp", sizes: "512x512", type: "image/webp" },
      { src: "/favicon.ico", sizes: "any" },
    ],
  };
}
