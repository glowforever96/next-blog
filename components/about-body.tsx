import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

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

  return (
    <div className="mt-12 flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-extrabold mb-6">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <Card key={skill.category}>
              <CardHeader>
                <CardTitle className="text-lg">{skill.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-gray-100 text-muted-foreground font-semibold rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="h-px bg-gray-200 my-8" />
      <div>
        <h2 className="text-2xl font-extrabold mb-6">Experience</h2>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Image
                src="/images/tmax_logo.webp"
                alt="티맥스 코어에이아이 로고"
                width={22}
                height={22}
              />
              TmaxCoreAI
            </CardTitle>
            <CardDescription className="text-base">
              Frontend Developer
            </CardDescription>
            <CardDescription>2022.10 - 2024.11</CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            사내 프론트엔드 개발자로 프로젝트 초기 설계부터 전반적인 개발
            프로세스 참여
          </CardContent>
        </Card>
      </div>
      <div className="h-px bg-gray-200 my-8" />
      <div>
        <h2 className="text-2xl font-extrabold mb-6">EDUCATION</h2>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              인하대학교
            </CardTitle>
            <CardDescription className="text-base">
              컴퓨터공학과 학사
            </CardDescription>
            <CardDescription>2015.03 - 2022.08</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
