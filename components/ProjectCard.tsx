import { postProjectApplication } from "@/lib/actions";
import { ProjectCardProps } from "@/types";
import Link from "next/link";
import React, { useState } from "react";
import { CustomModal } from ".";

const ProjectCard = ({
  id,
  position,
  area,
  task,
  start,
  end,
  skills,
  removeProject
}: ProjectCardProps) => {
  const userId = localStorage.getItem("contact-id");
  const [isOpen, setIsOpen] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState("");
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
        <p className="font-light">
          {new Date(start).toLocaleString(["en-US"], {
            day: "2-digit",
            month: "long",
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          -{" "}
          {new Date(end).toLocaleTimeString(["en-US"], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
        </p>
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
      <CustomModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        containerStyles=""
      >
        <h1 className="text-3xl mt-10 font-normal capitalize mb-5">
          Your application for <span className="font-bold">{position}</span>
        </h1>
        <p className="text-xl">Enter your letter of application below.</p>
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your message
        </label>
        <textarea
          id="message"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Dear Mr. Smith, ..."
          value={applicationMessage}
          onChange={(e) => setApplicationMessage(e.target.value)}
        />
        <button
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300
    font-medium rounded-lg text-sm px-5 py-2.5 mt-5"
          onClick={() => {
            postProjectApplication({
              shift: id,
              contact: userId!,
              note: applicationMessage,
            });
            setIsOpen(false);
            removeProject(id);
          }}
        >
          Send
        </button>
      </CustomModal>
    </div>
  );
};

export default ProjectCard;
