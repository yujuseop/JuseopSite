import Skills from "@/components/Skills";
import { get } from "@/utils/apiClient";
import type { SkillCategory } from "@/types/api";

async function fetchSkills() {
  try {
    return await get<SkillCategory[]>("/api/skills", 3600);
  } catch {
    return [];
  }
}

export default async function SkillsPage() {
  const categories = await fetchSkills();

  return (
    <div className="py-10">
      <Skills categories={categories} />
    </div>
  );
}
