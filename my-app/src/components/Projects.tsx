"use client";
import { useMemo, useState } from "react";
import Link from "next/link";

import Feed, { FeedItem } from "@/components/ui/Feed";
import Modal from "@/components/ui/Modal";
import { PROJECTS } from "@/content/portfolio";

type Project = FeedItem & {
  slug: string;
  detail: {
    summary: string;
    highlights: string[];
    participants: string;
    duration: string;
    techStack: { label: string }[];
    links?: {
      demo?: string;
      repo?: string;
    };
  };
};

const projects: Project[] = PROJECTS.map((project) => ({
  slug: project.slug,
  emoji: project.emoji,
  title: project.title,
  description: project.summary,
  techStack: project.techStack.map((label) => ({ label })),
  detail: {
    summary: project.description,
    highlights: project.highlights,
    participants: project.participants,
    duration: project.duration,
    techStack: project.techStack.map((label) => ({ label })),
    links: project.links,
  },
}));

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
        <header className="space-y-2 text-center">
          <h2 className="text-xl lg:text-2xl font-bold text-blue-600">
            프로젝트
          </h2>
          <p className="text-sm text-muted-foreground lg:text-base">
            대표 프로젝트를 미리 살펴보고, 클릭해 상세 설명을 확인하세요.
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
        metadata={
          selected ? (
            <dl className="grid grid-cols-1 gap-2 text-sm text-muted-foreground lg:grid-cols-2">
              <div className="flex flex-col gap-1">
                <dt className="font-medium text-foreground">참여 인원</dt>
                <dd>{selected.detail.participants}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-medium text-foreground">진행 기간</dt>
                <dd>{selected.detail.duration}</dd>
              </div>
            </dl>
          ) : null
        }
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
                {selected.detail.techStack.map((tech) => (
                  <span
                    key={`${selected.slug}-${tech.label}`}
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
