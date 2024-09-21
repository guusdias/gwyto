import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Flex, Button, Text, Box } from "@chakra-ui/react";
import { CourseCard } from "../CourseCard";
import { InputField } from "../Atoms/InputField";
import { getDateFormatter } from "../../helpers/getDateFormatter";
import { useDebounce } from "../../hooks/useDebounce";
import ICourse from "../../types/ICourse";
import Api from "../../api/course";

interface PaginationData {
  courses: ICourse[];
  current_page: number;
  total_pages: number;
}

export function ListingCourses() {
  const [page, setPage] = useState(1);
  const [endDateFilter, setEndDateFilter] = useState<string | null>(
    "2024-06-30"
  );
  const [titleFilter, setTitleFilter] = useState<string>("");

  const debouncedTitle = useDebounce(titleFilter, 500);

  const { data, isLoading, isError, error } = useQuery<PaginationData, Error>({
    queryKey: ["courses", page, endDateFilter, debouncedTitle],
    queryFn: () => Api.getApiData(page, endDateFilter, debouncedTitle),
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedDate = getDateFormatter(e.target.value);
    setEndDateFilter(formattedDate);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleFilter(e.target.value);
  };

  if (isLoading) return <div>Carregando...</div>;

  if (isError) {
    return <div>Erro ao carregar cursos: {(error as Error).message}</div>;
  }

  const courses = data?.courses || [];

  return (
    <Flex direction="column" gap={6}>
      <Box mb={4}>
        <InputField
          type="date"
          label="Data de Término"
          name="filter"
          value={endDateFilter || ""}
          onChange={handleDateChange}
          placeholder="Filtrar por data de término"
        />
      </Box>
      <Box mb={4}>
        <InputField
          type="text"
          label="Título do Curso"
          name="titleFilter"
          value={titleFilter}
          onChange={handleTitleChange}
          placeholder="Pesquisar pelo título do curso"
        />
      </Box>
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
