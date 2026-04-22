// ============================================================
// Spring Boot API 응답 타입 정의
// ============================================================

export interface Skill {
  name: string;
  level: number;
  description: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  displayOrder: number;
  skills: Skill[];
}

export interface Project {
  id: number;
  slug: string;
  emoji: string;
  title: string;
  summary: string;
  description: string;
  participants: string;
  duration: string;
  demoUrl?: string;
  repoUrl?: string;
  displayOrder: number;
  techStack: string[];
  highlights: string[];
}

export interface ExperienceHighlight {
  id: number;
  title: string;
  displayOrder: number;
  details: string[];
}

export interface Experience {
  id: number;
  company: string;
  emoji: string;
  role: string;
  employmentType: string;
  period: string;
  summary: string;
  team: string;
  displayOrder: number;
  techStack: string[];
  highlights: ExperienceHighlight[];
}

export interface PostSummary {
  id: number;
  slug: string;
  type: "blog" | "troubleShooting";
  title: string;
  description: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

export interface Post extends PostSummary {
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface Comment {
  id: number;
  postId: number;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface LikeResponse {
  liked: boolean;
  likeCount: number;
}

export interface ViewResponse {
  viewCount: number;
}
