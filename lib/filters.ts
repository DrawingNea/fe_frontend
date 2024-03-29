import {
  ProjectInterface,
  ProjectShiftApplicationInterface,
  UserInterface,
} from "@/types";

export function filterProjectsBySkills(
  projects: ProjectInterface[],
  contact: UserInterface
): ProjectInterface[] {
  return projects.filter((project) =>
    project.skills.every((projectSkill) =>
      contact.skills.some((userSkill) => userSkill.id === projectSkill.id)
    )
  );
}

export function markAppliedProjects(
  projects: ProjectInterface[],
  projectApplications: ProjectShiftApplicationInterface[]
): (ProjectInterface & { applied?: boolean })[] {
  return projects.map((project) => {
    const isApplied = projectApplications.some(
      (application) => application.shift === project.id
    );
    return isApplied ? { ...project, hasApplied: true } : project;
  });
}
