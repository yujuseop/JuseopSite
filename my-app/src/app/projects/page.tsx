import Projects from "@/components/Projects";
import { get } from "@/utils/apiClient";
import type { Project } from "@/types/api";

async function fetchProjects() {
  try {
    return await get<Project[]>("/api/projects", 3600);
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return (
    <div className="py-10">
      <Projects projects={projects} />
    </div>
  );
}
