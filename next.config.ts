import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  htmlLimitedBots: /.*/,
  cacheComponents: false,
  transpilePackages: ["next-mdx-remote"],
  experimental: {
    // next dev/build 시 새 메이저·마이너 릴리스가 있으면 알려주고,
    // `next upgrade --agent` 기본 정책으로 latest를 사용한다 (16.4+)
    agentUpgrade: "latest",
  },
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
  async headers() {
    return [
      // 포스트 썸네일은 파일명 변경으로만 갱신한다(동일 파일명 덮어쓰기 금지).
      // 원본에 긴 Cache-Control을 주면 /_next/image 최적화 결과도 이 max-age를 따라간다
      // (기본 minimumCacheTTL 4시간 대신 1년).
      {
        source: "/images/thumbnails/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
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
