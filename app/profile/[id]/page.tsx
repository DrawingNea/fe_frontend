"use client";

import { DetailsPage } from "@/components";
import { fetchUser } from "@/lib/actions";
import { UserInterface } from "@/types";
import React, { useEffect, useState } from "react";

const ProfileDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserInterface>();
  async function fetchData() {
    const {contact} = await fetchUser();
    setUser(contact);
  }

  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, []);
  return isLoading ? (
    <></>
  ) : (
    <DetailsPage
      mainTitle={user?.firstName || ""}
      subTitle={user?.lastName || ""}
      skills={user?.skills || [{ id: "", name: "" }]}
    />
  );
};

export default ProfileDetails;
