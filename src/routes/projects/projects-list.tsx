import { Navbar } from "@/components/navbar";
import { UserType } from "@/schemas/auth.schema";
import { useLoaderData } from "react-router-dom";

const ProjectsList = () => {
  const data = useLoaderData() as UserType;

  return (
    <div>
      <Navbar user={data} />
      <h1 className="text-3xl text-center mt-28">Projects List</h1>
    </div>
  );
};

export default ProjectsList;
