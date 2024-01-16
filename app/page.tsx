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
import { useEffect, useState } from "react";

export default function Home() {
  const [contact, setContact] = useState<UserInterface>();
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [projectApplications, setProjectApplications] = useState<
    ProjectShiftApplicationInterface[]
  >([]);
  const [groupsByArea, setGroupsByArea] = useState<
    Record<string, ProjectInterface[]>
  >({});
  async function getUser() {
    const { contact } = await fetchUser();
    setContact(contact);
    localStorage.setItem("contact-id", contact.id);
  }
  async function getProjects() {
    const projects = await fetchProjectShifts();
    setProjects(projects);
  }
  async function getProjectApplications() {
    const prjApplications = await fetchProjectAppliations();
    setProjectApplications(prjApplications);
  }
  useEffect(() => {
    getUser();
    getProjects();
    getProjectApplications();
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

  return (
    <main className="xl:mx-60 lg:mx-40 mx-28">
      {Object.entries(groupsByArea).map(
        ([area, groupProjects]: [string, ProjectInterface[]]) => (
          <div className="pt-14">
            <h1 className="font-bold text-5xl text-center mb-5">{area}</h1>
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 w-full place-items-center justify-items-center">
              {groupProjects
                .sort(
                  (a, b) =>
                    new Date(a.start).getTime() - new Date(b.start).getTime()
                )
                .map((groupProjects: ProjectCardProps) => {
                  return <ProjectCard {...groupProjects} />;
                })}
            </div>
          </div>
        )
      )}
    </main>
  );
}
