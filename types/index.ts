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

export type Project = {
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
