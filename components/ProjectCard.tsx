import { ProjectCardProps } from "@/types";
import Link from "next/link";
import React, { useState } from "react";
import { ApplicationModal, TimeInterval } from ".";

const ProjectCard = ({
  id,
  position,
  area,
  task,
  start,
  end,
  skills,
  removeProject,
}: ProjectCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className=" block bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.1),0_10px_20px_-2px_rgba(0,0,0,0.1)]
    flex-1 w-[80%] max-h-72 mb-5 py-10 text-center rounded-3xl"
    >
      <Link href={`/project-shift/${id}`}>
        <h5 className="mb-2 text-2xl font-medium leading-tight text-neutral-800 ">
          {position}
        </h5>
      </Link>
      <div className="mb-4 text-neutral-600">
        <p className="font-semibold">{area}</p>
        <p className="text-base">{task}</p>
        <TimeInterval start={start} end={end} textStyles="font-light" />
      </div>
      <button
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300
    font-medium rounded-lg text-sm px-5 py-2.5"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Get this Job
      </button>
      <ApplicationModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        position={position}
        removeProject={removeProject}
        id={id}
      />
    </div>
  );
};

export default ProjectCard;
