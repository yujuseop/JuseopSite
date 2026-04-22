import Link from "next/link";
import { notFound } from "next/navigation";
import { get } from "@/utils/apiClient";
import { getProjectDetail } from "@/utils/posts";
import type { Project } from "@/types/api";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const projects = await get<Project[]>("/api/projects", 3600);
    return projects.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  const [project, detail] = await Promise.all([
    get<Project>(`/api/projects/${slug}`, 3600).catch(() => null),
    getProjectDetail(slug),
  ]);

  if (!project) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-10">
      {/* 뒤로가기 */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground"
      >
        ← 프로젝트 목록
      </Link>

      {/* 헤더 */}
      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{project.emoji}</span>
          <h1 className="text-2xl font-bold leading-tight lg:text-3xl">
            {project.title}
          </h1>
        </div>
        <p className="text-muted-foreground">{project.summary}</p>
      </header>

      {/* 개요 테이블 */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold">프로젝트 개요</h2>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="space-y-0.5">
            <dt className="font-medium text-foreground">기간</dt>
            <dd className="text-muted-foreground">
              {detail?.period || project.duration}
            </dd>
          </div>
          <div className="space-y-0.5">
            <dt className="font-medium text-foreground">팀 구성</dt>
            <dd className="text-muted-foreground">
              {detail?.team || project.participants}
            </dd>
          </div>
          {detail?.role && (
            <div className="space-y-0.5 sm:col-span-2">
              <dt className="font-medium text-foreground">나의 역할</dt>
              <dd className="text-muted-foreground">{detail.role}</dd>
            </div>
          )}
          <div className="space-y-0.5 sm:col-span-2">
            <dt className="font-medium text-foreground">기술 스택</dt>
            <dd className="flex flex-wrap gap-2 pt-1">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </section>

      {/* 본문 — 마크다운 or API 기본 정보 */}
      {detail ? (
        <article
          className="prose prose-neutral max-w-none dark:prose-invert
            prose-headings:font-bold prose-headings:text-foreground
            prose-p:text-muted-foreground prose-li:text-muted-foreground
            prose-blockquote:border-blue-500 prose-blockquote:text-muted-foreground
            prose-strong:text-foreground"
          dangerouslySetInnerHTML={{ __html: detail.contentHtml }}
        />
      ) : (
        <div className="space-y-4">
          <p className="text-muted-foreground">{project.description}</p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 링크 */}
      {(project.demoUrl || project.repoUrl) && (
        <footer className="flex gap-3 pt-4 border-t border-border">
          {project.demoUrl && (
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-5 py-2 text-sm font-medium transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10"
            >
              데모 보기
            </Link>
          )}
          {project.repoUrl && (
            <Link
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-5 py-2 text-sm font-medium transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10"
            >
              GitHub
            </Link>
          )}
        </footer>
      )}
    </div>
  );
}
