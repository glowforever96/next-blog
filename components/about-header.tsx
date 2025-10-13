import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Github, MailIcon, MapPinIcon } from "lucide-react";

export default function AboutHeader() {
  return (
    <div className="flex gap-4 items-center justify-between flex-col-reverse md:flex-row pb-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-extrabold">SOONYONG KWON</h1>
        <h2 className="text-lg font-bold text-gray-700">Frontend Developer</h2>
        <p className="text-muted-foreground flex items-center gap-1">
          <MapPinIcon size={16} color="#6a7282" /> Seoul, Korea
        </p>
        <p className="text-muted-foreground leading-relaxed my-2">
          사용자 경험에 진심인 주니어 프론트엔드 개발자 권순용입니다.
          <br /> 1px의 차이도 놓치지 않는 꼼꼼함으로 더 나은 사용자 경험을
          만들어 가고 있습니다. <br /> 프론트엔드를 깊이 탐구하면서도 새로운
          기술에 늘 열려 있으며, <br /> 앞으로는 더 넓은 시야를 가진 소프트웨어
          엔지니어로 성장하고자 합니다.
        </p>
        <div className="flex gap-2 mt-2">
          <Button variant="outline" className="cursor-pointer" asChild>
            <Link href="https://github.com/glowforever96" target="_blank">
              <Github color="#6a7282" />
            </Link>
          </Button>
          <Button variant="outline" className="cursor-pointer" asChild>
            <Link href="mailto:tnsdyd10@naver.com" target="_blank">
              <MailIcon color="#6a7282" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="relative w-72 h-72 rounded-full overflow-hidden shrink-0">
        <Image
          src="/images/me.webp"
          alt="my profile img"
          fill
          priority
          sizes="288px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
