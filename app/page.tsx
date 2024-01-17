"use client";
import ProjectCard from "@/components/ProjectCard";
import {
  fetchProjectAppliations,
  fetchProjectShifts,
  fetchUser,
} from "@/lib/actions";
import {
  filterProjectsByApplications,
  filterProjectsBySkills,
} from "@/lib/filters";
import {
  UserInterface,
  ProjectInterface,
  ProjectCardProps,
  ProjectShiftApplicationInterface,
} from "@/types";
import { group } from "console";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [contact, setContact] = useState<UserInterface>();
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [projectApplications, setProjectApplications] = useState<
    ProjectShiftApplicationInterface[]
  >([]);
  const [groupsByArea, setGroupsByArea] = useState<
    Record<string, ProjectInterface[]>
  >({});
  async function fetchData() {
    const { contact } = await fetchUser();
    setContact(contact);
    localStorage.setItem("contact-id", contact.id);

    const prjApplications = await fetchProjectAppliations();
    setProjectApplications(prjApplications);

    const projects = await fetchProjectShifts();
    setProjects(
      filterProjectsBySkills(
        filterProjectsByApplications(projects, prjApplications),
        contact
      )
    );
  }
  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setGroupsByArea(groupProjectsByArea(projects));
  }, [projects]);

  function groupProjectsByArea(
    projects: ProjectInterface[]
  ): Record<string, ProjectInterface[]> {
    return filterProjectsBySkills(
      filterProjectsByApplications(projects, projectApplications),
      contact!
    ).reduce((groups, project) => {
      const key = project.area;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(project);
      return groups;
    }, {} as Record<string, ProjectInterface[]>);
  }

  function removeProjectAfterApplication(projectId: string) {
    const updatedGroup: Record<string, ProjectInterface[]> = {};
    Object.entries(groupsByArea).forEach(
      ([area, projects]: [string, ProjectInterface[]]) => {
        const projectsNotContainingId = projects.filter(
          (project) => project.id !== projectId
        );
        if (projectsNotContainingId.length > 0) {
          updatedGroup[area] = projectsNotContainingId;
        }
        setGroupsByArea(updatedGroup);
      }
    );
  }

  return isLoading ? (
    <></>
  ) : (
    <main className="xl:mx-60 lg:mx-40 mx-28">
      {Object.entries(groupsByArea).map(
        ([area, groupProjects]: [string, ProjectInterface[]]) => (
          <div className="pt-14" key={area}>
            <h1 className="font-bold text-5xl text-center mb-5">{area}</h1>
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 w-full place-items-center justify-items-center">
              {groupProjects
                .sort(
                  (a, b) =>
                    new Date(a.start).getTime() - new Date(b.start).getTime()
                )
                .map((groupProjects: ProjectInterface) => {
                  const projectCardProps: ProjectCardProps = {
                    ...groupProjects,
                    removeProject: removeProjectAfterApplication,
                  };
                  return (
                    <ProjectCard
                      key={projectCardProps.id}
                      {...projectCardProps}
                    />
                  );
                })}
            </div>
          </div>
        )
      )}
    </main>
  );
}
