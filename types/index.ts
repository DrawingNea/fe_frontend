import { MouseEventHandler, ReactNode } from "react";

export type ProjectCardProps = {
  id: string;
  position: string;
  area: string;
  task: string;
  start: string;
  end: string;
  skills: [
    {
      id: string;
      name: string;
    }
  ];
  hasApplied?: boolean;
  removeProject: (id: string) => void;
};

export type ProjectInterface = {
  id: string;
  position: string;
  area: string;
  task: string;
  start: string;
  end: string;
  skills: [
    {
      id: string;
      name: string;
    }
  ];
};

export type UserInterface = {
  id: string;
  firstName: string;
  lastName: string;
  skills: [
    {
      id: string;
      name: string;
    }
  ];
};

export type ProjectShiftApplicationInterface = {
  id: string;
  contact: string;
  shift: string;
  note: string;
};

export type CustomModalProps = {
  children: ReactNode;
  containerStyles: string;
  isOpen: boolean;
  closeModal: () => void;
};

export type CustomButtonProps = {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  textStyles?: string;
  rightIcon?: string;
  isDisabled?: boolean;
};

export type ApplicationModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  position: string;
  removeProject: (id: string) => void;
  id: string;
};

export type TimeIntervalProps = {
  start: string;
  end: string;
  textStyles?: string;
}