import { useQuery } from "@tanstack/react-query";
import { Flex } from "@chakra-ui/react";

import Api from "../../../api/course";
import ICourse from "../../../types/ICourse";
import CourseCard from "../../Atoms/CourseCard";

export default function ListingCourses() {
  const {
    data: courses = [],
    isLoading,
    isError,
    error,
  } = useQuery<ICourse[], Error>({
    queryKey: ["courses"],
    queryFn: Api.getApiData,
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar cursos: {(error as Error).message}</div>;
  }

  return (
    <Flex gap={6} direction={"column"}>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </Flex>
  );
}
