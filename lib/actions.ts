"use server";

import { ProjectShiftApplicationInterface } from "@/types";

export const fetchUser = async () => {
  try {
    const response = await fetch("http://localhost:3004/me");
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Error fetching user");
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

export const fetchProjectShifts = async () => {
  try {
    const response = await fetch("http://localhost:3004/project_shifts");
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Error fetching project shifts");
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

export const fetchProjectAppliations = async () => {
  try {
    const response = await fetch(
      "http://localhost:3004/project_shift_applications"
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Error fetching project applications");
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

export const postProjectApplication = async (application: {
  contact: string;
  shift: string;
  note: string;
}) => {
  try {
    const response = await fetch(
      "http://localhost:3004/project_shift_applications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(application),
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Error posting project application");
    }
  } catch (error) {
    console.log("Error:", error);
  }
};
