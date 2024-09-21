import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Flex, Button, Text } from "@chakra-ui/react";
import Api from "../../api/course";
import ICourse from "../../types/ICourse";
import { CourseCard } from "../CourseCard";

interface PaginationData {
  courses: ICourse[];
  current_page: number;
  total_pages: number;
}

export function ListingCourses() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery<PaginationData, Error>({
    queryKey: ["courses", page],
    queryFn: () => Api.getApiData(page),
  });

  if (isLoading) return <div>Carregando...</div>;

  if (isError) {
    return <div>Erro ao carregar cursos: {(error as Error).message}</div>;
  }

  const courses = data?.courses || [];

  return (
    <Flex direction="column" gap={6}>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}

      <Flex justify="center" gap={4} mt={4}>
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          isDisabled={page === 1}
        >
          Anterior
        </Button>
        <Text>{`${data?.current_page}/${data?.total_pages}`}</Text>
        <Button
          onClick={() => setPage((prev) => prev + 1)}
          isDisabled={data?.current_page === data?.total_pages}
        >
          Próxima
        </Button>
      </Flex>
    </Flex>
  );
}
