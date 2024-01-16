import { ProjectInterface, ProjectShiftApplicationInterface, UserInterface } from "@/types";

export function filterProjectsBySkills(
    projects: ProjectInterface[], contact: UserInterface
  ): ProjectInterface[] {
    return projects.filter((project) =>
      project.skills.every((projectSkill) =>
        contact.skills.some((userSkill) => userSkill.id === projectSkill.id)
      )
    );
  }

 export function filterProjectsByApplications(
    projects: ProjectInterface[], projectApplications: ProjectShiftApplicationInterface[]
  ): ProjectInterface[] {
    return projects.filter(
      (project) =>
        !projectApplications.some(
          (application) => application.shift === project.id
        )
    );
  }