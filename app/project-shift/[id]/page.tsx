"use client";
import { fetchProjectShiftById } from "@/lib/actions";
import { ProjectInterface } from "@/types";
import React, { useEffect, useState } from "react";

const ProjectDetails = ({ params: { id } }: { params: { id: string } }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<ProjectInterface>();
  async function fetchData() {
    const fetchedProject = await fetchProjectShiftById(id);
    setProject(fetchedProject[0]);
  }

  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, []);
  return isLoading ? (
    <></>
  ) : (
    <div className="flex flex-col justify-center items-center place-content-center my-20">
      <h1 className="text-5xl font-bold">{project?.position}</h1>
      <p className="text-3xl font-medium mb-5">{project?.area}</p>
      <p className="text-xl font-light">{project?.task}</p>
      <p className="text-xl font-light">
        {new Date(project?.start!).toLocaleString(["en-US"], {
          day: "2-digit",
          month: "long",
          hour: "2-digit",
          minute: "2-digit",
        })}{" "}
        -{" "}
        {new Date(project?.end!).toLocaleTimeString(["en-US"], {
          hour: "2-digit",
          minute: "2-digit",
        })}{" "}
      </p>
      <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800 my-5">
        {project?.skills.map((skill) => (
          <li className="bg-white border border-black/[0.1] rounded-xl px-5 py-3">
            <p className="text-xl font-light capitalize">{skill.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetails;
