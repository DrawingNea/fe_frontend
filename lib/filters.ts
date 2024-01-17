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

export function filterProjectsByApplications(
  projects: ProjectInterface[],
  projectApplications: ProjectShiftApplicationInterface[]
): ProjectInterface[] {
  return projects.filter(
    (project) =>
      !projectApplications.some(
        (application) => application.shift === project.id
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

export function filterOutProjectFromGroup(projectId: string, groupsByArea: Record<string, ProjectInterface[]>) {
    const updatedGroup: Record<string, ProjectInterface[]> = {};
    Object.entries(groupsByArea).forEach(
      ([area, projects]: [string, ProjectInterface[]]) => {
        const projectsNotContainingId = projects.filter(
          (project) => project.id !== projectId
        );
        if (projectsNotContainingId.length > 0) {
          updatedGroup[area] = projectsNotContainingId;
        }
      }
    );
    return updatedGroup;
}
