import { fetchProjectShifts, fetchUser } from "@/lib/actions";
import { Project, ProjectCardProps } from "@/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ProjectCard = ({
  id,
  position,
  area,
  task,
  start,
  end,
  skills,
}: ProjectCardProps) => {
  return (
    <div
      className=" block bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.1),0_10px_20px_-2px_rgba(0,0,0,0.1)]
    flex-1 w-[80%] h-60 mb-5 py-10 text-center rounded-2xl"
    >
      <Link href={`/project/${id}`}>
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 ">
          {position}
        </h5>
      </Link>
      <div className="mb-4 text-neutral-600">
        <p className="font-semibold">{area}</p>
        <p className="text-base">{task}</p>
        <p className="font-light">
          {new Date(start).toLocaleString([], {
            day: "2-digit",
            month: "long",
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          -{" "}
          {new Date(end).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          Uhr
        </p>
      </div>
      <button
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300
      font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
      >
        Get this Job
      </button>
    </div>
  );
};

export default ProjectCard;
