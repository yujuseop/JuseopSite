import Experience from "@/components/Experience";
import { get } from "@/utils/apiClient";
import type { Experience as ExperienceType } from "@/types/api";

async function fetchExperiences() {
  try {
    return await get<ExperienceType[]>("/api/experiences", 3600);
  } catch {
    return [];
  }
}

export default async function CareerPage() {
  const experiences = await fetchExperiences();

  return (
    <div className="py-10">
      <Experience experiences={experiences} />
    </div>
  );
}
