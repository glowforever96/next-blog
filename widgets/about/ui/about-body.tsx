import Image from "next/image";
import { Badge } from "@/shared/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

interface TimelineEntry {
  title: React.ReactNode;
  role?: string;
  period?: string;
  description?: string;
}

function SectionHeading({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-mono text-sm tabular-nums text-blue-500 dark:text-blue-400">
        {index}
      </span>
      <h2 className="text-2xl font-extrabold text-foreground">{children}</h2>
      <span aria-hidden className="h-px flex-1 bg-border" />
    </div>
  );
}

function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative ml-1.5 border-l border-border pl-6 space-y-8">
      {entries.map((entry, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[1.9rem] top-1.5 h-3 w-3 rounded-full bg-blue-500 ring-4 ring-background dark:bg-blue-400" />
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-lg font-bold text-foreground">
              {entry.title}
            </span>
            {entry.role && (
              <Badge
                variant="outline"
                className="border-blue-500/30 text-blue-500 dark:text-blue-400"
              >
                {entry.role}
              </Badge>
            )}
          </div>
          {entry.period && (
            <p className="mt-1 font-mono text-xs tabular-nums text-muted-foreground">
              {entry.period}
            </p>
          )}
          {entry.description && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {entry.description}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

export default function AboutBody() {
  const skills = [
    {
      category: "Frontend",
      items: [
        "React",
        "Next.js",
        "React Native (Expo)",
        "TypeScript",
        "JavaScript",
      ],
    },
    {
      category: "State Management / Data Fetching",
      items: [
        "TanStack Query",
        "SWR",
        "Recoil",
        "Zustand",
        "react-hook-form",
        "zod",
      ],
    },
    {
      category: "Styling / UI",
      items: ["styled-components", "Tailwind CSS", "MUI", "shadcn/ui"],
    },
    {
      category: "Authentication / Database",
      items: ["NextAuth.js", "Drizzle ORM", "Prisma", "NeonDB", "Supabase"],
    },
    {
      category: "DevOps / Deployment",
      items: ["Docker", "Vercel", "GitHub Actions (CI/CD)", "AWS"],
    },
    {
      category: "Etc",
      items: ["Git", "Figma", "Slack", "Notion", "Cursor AI"],
    },
  ];

  const experience: TimelineEntry[] = [
    {
      title: (
        <span className="flex items-center gap-2">
          <Image
            src="/images/tmax_logo.webp"
            alt="티맥스 코어에이아이 로고"
            width={22}
            height={22}
          />
          TmaxCoreAI
        </span>
      ),
      role: "Frontend Developer",
      period: "2022.10 – 2024.11",
      description:
        "사내 프론트엔드 개발자로 프로젝트 초기 설계부터 전반적인 개발 프로세스 참여",
    },
  ];

  const openSource: TimelineEntry[] = [
    {
      title: (
        <a
          href="https://github.com/mutativejs/use-travel/pull/13"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-blue-500 hover:underline dark:hover:text-blue-400"
        >
          mutativejs/use-travel #13
        </a>
      ),
      role: "Contributor",
      description:
        "React Compiler 환경에서 얼어붙던 undo/redo 상태를 해결하는 canUndo/canRedo getter 추가 (v1.9.0 머지)",
    },
  ];

  const education: TimelineEntry[] = [
    {
      title: "인하대학교",
      role: "컴퓨터공학과 학사",
      period: "2015.03 – 2022.08",
    },
  ];

  const timelineSections = [
    { index: "02", title: "EXPERIENCE", entries: experience },
    { index: "03", title: "OPEN SOURCE", entries: openSource },
    { index: "04", title: "EDUCATION", entries: education },
  ];

  return (
    <div className="mt-12 flex flex-col gap-12">
      <section>
        <SectionHeading index="01">HAVE USED</SectionHeading>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {skills.map((skill) => (
            <Card key={skill.category} className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
                  {skill.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <Badge
                      key={item}
                      variant="secondary"
                      className="border border-border/60 px-3 py-1 text-sm transition-colors hover:border-blue-500/40 hover:text-foreground"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {timelineSections.map((section) => (
        <section key={section.index}>
          <SectionHeading index={section.index}>
            {section.title}
          </SectionHeading>
          <Timeline entries={section.entries} />
        </section>
      ))}
    </div>
  );
}
