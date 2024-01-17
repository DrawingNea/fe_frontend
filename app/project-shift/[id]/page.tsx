"use client";
import { DetailsPage, TimeInterval } from "@/components";
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
    <DetailsPage
      mainTitle={project?.position || ""}
      subTitle={project?.area || ""}
      skills={project?.skills || [{ id: "", name: "" }]}
    >
      <>
        <p>{project?.task}</p>
        <TimeInterval
          start={project?.start || ""}
          end={project?.end || ""}
          textStyles="text-xl font-light"
        />
      </>
    </DetailsPage>
  );
};

export default ProjectDetails;
