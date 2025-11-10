"use client";
import { useMemo, useState } from "react";
import Link from "next/link";

import Feed, { FeedItem } from "@/components/ui/Feed";
import Modal from "@/components/ui/Modal";

type Project = FeedItem & {
  detail: {
    summary: string;
    highlights: string[];
    links?: {
      demo?: string;
      repo?: string;
    };
  };
};

const projects: Project[] = [
  {
    emoji: "🚀",
    title: "개인 포트폴리오 사이트",
    description:
      "Next.js와 Tailwind CSS로 구축한 반응형 포트폴리오, 다크 모드와 블로그를 지원합니다.",
    techStack: [
      { label: "Next.js" },
      { label: "TypeScript" },
      { label: "Tailwind CSS" },
      { label: "MDX" },
    ],
    detail: {
      summary:
        "디자인 시스템과 콘텐츠 관리를 효율적으로 적용하기 위해 Next.js 14 App Router를 활용해 설계한 개인 포트폴리오입니다.",
      highlights: [
        "프로젝트·블로그·연락처를 한 곳에서 관리하도록 정보 구조(IA)를 재정비",
        "MDX 기반 블로그 게시글 빌드 파이프라인을 구축해 마크다운만으로 글 작성 가능",
        "다크 모드 및 반응형 레이아웃을 Tailwind CSS 커스텀 프리셋으로 구성",
      ],
      links: {
        repo: "https://github.com/yujuseop/JuseopSite",
      },
    },
  },
];

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  const feedItems = useMemo<FeedItem[]>(
    () =>
      projects.map((project) => {
        const { detail, ...feedInfo } = project;
        void detail;
        return { ...feedInfo };
      }),
    []
  );

  return (
    <>
      <section className="space-y-4">
        <header className="space-y-2">
          <h2 className="text-2xl font-bold">프로젝트</h2>
          <p className="text-muted-foreground">
            대표 프로젝트를 피드 형식으로 미리 살펴보고, 클릭해 상세 설명을
            확인하세요.
          </p>
        </header>

        <Feed
          items={feedItems}
          onItemSelect={(item) => {
            const project = projects.find(
              (candidate) => candidate.title === item.title
            );
            if (project) {
              setSelected(project);
            }
          }}
        />
      </section>

      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected?.title}
        description={selected?.description}
        footer={
          selected?.detail.links ? (
            <div className="flex gap-2">
              {selected.detail.links.demo ? (
                <Link
                  href={selected.detail.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10"
                >
                  데모 보기
                </Link>
              ) : null}
              {selected.detail.links.repo ? (
                <Link
                  href={selected.detail.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10"
                >
                  GitHub 바로가기
                </Link>
              ) : null}
            </div>
          ) : null
        }
      >
        {selected ? (
          <div className="space-y-4">
            <p>{selected.detail.summary}</p>
            <ul className="list-disc space-y-2 pl-5">
              {selected.detail.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <div>
              <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
                사용 기술 스택
              </h4>
              <div className="flex flex-wrap gap-2">
                {selected.techStack.map((tech) => (
                  <span
                    key={`${selected.title}-${tech.label}`}
                    className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tech.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
