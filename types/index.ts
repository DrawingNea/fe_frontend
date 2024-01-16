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
    ]
}

export type ProjectShiftApplicationInterface = {
  id: string;
  contact: string;
  shift: string;
  note: string;
}
