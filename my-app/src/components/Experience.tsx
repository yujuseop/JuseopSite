"use client";

import { useMemo, useState } from "react";

import Feed, { FeedItem } from "@/components/ui/Feed";
import Modal from "@/components/ui/Modal";
import type { Experience as ExperienceType } from "@/types/api";

interface Props {
  experiences: ExperienceType[];
}

export default function Experience({ experiences }: Props) {
  const [selected, setSelected] = useState<ExperienceType | null>(null);

  const feedItems = useMemo<FeedItem[]>(
    () =>
      experiences.map((e) => ({
        emoji: e.emoji,
        title: `${e.company} · ${e.role}`,
        description: e.summary,
        techStack: e.techStack.map((label) => ({ label })),
      })),
    [experiences]
  );

  return (
    <>
      <section className="space-y-6">
        <header className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-blue-600">경력</h2>
          <p className="text-sm text-muted-foreground lg:text-base">
            프로젝트와 협업을 통해 얻은 실무 역량을 소개합니다.
          </p>
        </header>

        <Feed
          items={feedItems}
          onItemSelect={(item) => {
            const experience = experiences.find(
              (e) => `${e.company} · ${e.role}` === item.title
            );
            if (experience) setSelected(experience);
          }}
        />
      </section>

      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected ? `${selected.company} · ${selected.role}` : undefined}
        description={selected?.summary}
        metadata={
          selected ? (
            <dl className="grid grid-cols-1 text-sm text-muted-foreground lg:grid-cols-3">
              <div className="flex flex-col gap-1">
                <dt className="font-medium text-foreground">근무 형태</dt>
                <dd>{selected.employmentType}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-medium text-foreground">기간</dt>
                <dd>{selected.period}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-medium text-foreground">팀 구성</dt>
                <dd>{selected.team}</dd>
              </div>
            </dl>
          ) : null
        }
      >
        {selected ? (
          <div className="space-y-6">
            <section>
              <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
                사용 기술
              </h4>
              <div className="flex flex-wrap gap-2">
                {selected.techStack.map((tech) => (
                  <span
                    key={`${selected.company}-${tech}`}
                    className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            <div className="space-y-4">
              {selected.highlights.map((highlight) => (
                <section key={`${selected.company}-${highlight.title}`}>
                  <h5 className="text-sm font-semibold text-foreground">
                    {highlight.title}
                  </h5>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    {highlight.details.map((detail) => (
                      <li key={`${selected.company}-${highlight.title}-${detail}`}>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
