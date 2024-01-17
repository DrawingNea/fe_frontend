import { DetailsPageProps } from "@/types";
import React from "react";

const DetailsPage = ({
  children,
  mainTitle,
  subTitle,
  skills,
}: DetailsPageProps) => {
  return (
    <div className="flex flex-col justify-center items-center place-content-center my-20">
      <h1 className="text-5xl font-bold">{mainTitle}</h1>
      <p className="text-3xl font-medium mb-5">{subTitle}</p>
      <div className="text-xl font-light text-center">{children}</div>
      <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800 my-5">
        {skills.map((skill) => (
          <li className="bg-white border border-black/[0.1] rounded-xl px-5 py-3">
            <p className="text-xl font-light capitalize">{skill.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetailsPage;
