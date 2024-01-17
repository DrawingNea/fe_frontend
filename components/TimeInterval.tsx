import { TimeIntervalProps } from "@/types";
import React from "react";

const TimeInterval = ({ start, end, textStyles }: TimeIntervalProps) => {
  return (
    <p className={`${textStyles}`}>
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
  );
};

export default TimeInterval;
