"use client";

import React, { useState } from "react";
import { CustomButton, CustomModal } from ".";
import { postProjectApplication } from "@/lib/actions";
import { ApplicationModalProps } from "@/types";

const ApplicationModal = ({
  isOpen,
  setIsOpen,
  position,
  id,
  setApplication,
}: ApplicationModalProps) => {
  const userId = localStorage.getItem("contact-id");
  const [applicationMessage, setApplicationMessage] = useState("");
  return (
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
      <div className="flex justify-center">
      <CustomButton
        title="Send"
        btnType="button"
        containerStyles="bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300
    font-medium rounded-lg text-sm px-5 py-2.5 mt-5"
        textStyles="text-white text-sm font-medium"
        handleClick={(e) => {
          postProjectApplication({
            shift: id,
            contact: userId!,
            note: applicationMessage,
          });
          setIsOpen(false);
          setApplication(true);
        }}
      /></div>
    </CustomModal>
  );
};

export default ApplicationModal;
