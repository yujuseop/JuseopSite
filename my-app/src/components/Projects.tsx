"use client";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

import Feed, { FeedItem } from "@/components/ui/Feed";
import type { Project } from "@/types/api";

interface Props {
  projects: Project[];
}

export default function Projects({ projects }: Props) {
  const router = useRouter();

  const feedItems = useMemo<FeedItem[]>(
    () =>
      projects.map((p) => ({
        slug: p.slug,
        emoji: p.emoji,
        title: p.title,
        description: p.summary,
        techStack: p.techStack.map((label) => ({ label })),
        href: `/projects/${p.slug}`,
      })),
    [projects]
  );

  return (
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
          if (item.href) router.push(item.href);
        }}
      />
    </section>
  );
}
