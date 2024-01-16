"use client";
import ProjectCard from "@/components/ProjectCard";
import { fetchProjectShifts, fetchUser } from "@/lib/actions";
import { UserInterface,ProjectInterface, ProjectCardProps } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [contact, setContact] = useState<UserInterface>();
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  async function getUser() {
    const { contact } = await fetchUser();
    console.log(contact);
    setContact(contact);
    localStorage.setItem("contact-id", contact.id)
  }
  async function getProjects() {
    const projects = await fetchProjectShifts();
    console.log(projects);
    setProjects(projects);
  }
  useEffect(() => {
    getUser();
    getProjects();
  }, []);
  return (
    <main className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full pt-14 place-items-center">
      {projects.map((project: ProjectCardProps) => {
        return <ProjectCard {...project} />;
      })}
    </main>
  );
}
