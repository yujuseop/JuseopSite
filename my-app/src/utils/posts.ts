import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");
const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");

export interface PostSummary {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export interface PostDetail extends PostSummary {
  contentHtml: string;
}

export function getPosts(type: "blog" | "troubleShooting"): PostSummary[] {
  const dir = path.join(POSTS_DIR, type);
  const files = fs.readdirSync(dir);

  return files
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(".md", "");
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        description: data.description ?? "",
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export interface ProjectDetail {
  slug: string;
  title: string;
  period: string;
  team: string;
  role: string;
  techStack: string;
  contentHtml: string;
}

export async function getProjectDetail(slug: string): Promise<ProjectDetail | null> {
  const filepath = path.join(PROJECTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filepath)) return null;

  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);
  const contentHtml = await marked(content);

  return {
    slug,
    title: data.title ?? slug,
    period: data.period ?? "",
    team: data.team ?? "",
    role: data.role ?? "",
    techStack: data.techStack ?? "",
    contentHtml,
  };
}

export async function getPost(
  type: "blog" | "troubleShooting",
  slug: string
): Promise<PostDetail | null> {
  const filepath = path.join(POSTS_DIR, type, `${slug}.md`);

  if (!fs.existsSync(filepath)) return null;

  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);
  const contentHtml = await marked(content);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    contentHtml,
  };
}
