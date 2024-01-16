"use server";

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
