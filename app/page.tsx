"use client";
import { fetchProjectShifts, fetchUser } from "@/lib/actions";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [contact, setContact] = useState(null);
  const [projects, setProjects] = useState(null);
  async function getUser() {
    const { contact } = await fetchUser();
    console.log(contact);
    setContact(contact);
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
  return <main>FE Features</main>;
}
