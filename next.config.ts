import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  htmlLimitedBots: /.*/,
  cacheComponents: false,
  transpilePackages: ["next-mdx-remote"],
  images: {
    // About 라이트박스는 2400px 원본을 q90으로 서빙(기본 q75는 확대 시 뭉개짐)
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      // 오타 slug로 색인된 URL을 유지하기 위한 영구 리다이렉트
      {
        source: "/posts/use-effet-event",
        destination: "/posts/use-effect-event",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
