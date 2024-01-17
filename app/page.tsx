"use client";
import ProjectCard from "@/components/ProjectCard";
import {
  fetchProjectApplications,
  fetchProjectShifts,
  fetchUser,
} from "@/lib/actions";
import {
  filterProjectsBySkills,
  markAppliedProjects,
} from "@/lib/filters";
import {
  UserInterface,
  ProjectInterface,
  ProjectCardProps,
  ProjectShiftApplicationInterface,
} from "@/types";
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

    const prjApplications = await fetchProjectApplications();
    setProjectApplications(prjApplications);

    const projects = await fetchProjectShifts();
    setProjects(
      filterProjectsBySkills(
        markAppliedProjects(projects, prjApplications),
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
      markAppliedProjects(projects, projectApplications),
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

  return isLoading ? (
    <></>
  ) : (
    <main className="xl:mx-60 lg:mx-40 mx-28 my-14">
      {Object.entries(groupsByArea).map(
        ([area, groupProjects]: [string, ProjectInterface[]]) => (
          <div className="pb-14" key={area}>
            <h1 className="font-bold text-5xl text-center mb-5">{area}</h1>
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 w-full place-items-center justify-items-center">
              {groupProjects
                .sort(
                  (a, b) =>
                    new Date(a.start).getTime() - new Date(b.start).getTime()
                )
                .map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
            </div>
          </div>
        )
      )}
    </main>
  );
}
