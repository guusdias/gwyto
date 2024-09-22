import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CourseCard } from "../CourseCard";
import { InputField } from "../Atoms/InputField";
import { getDateFormatter } from "../../helpers/getDateFormatter";
import { useDebounce } from "../../hooks/useDebounce";
import { Flex, Button, Text, Box, Stack, SimpleGrid } from "@chakra-ui/react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import ICourse from "../../types/ICourse";
import Api from "../../api/course";

interface PaginationData {
  courses: ICourse[];
  current_page?: number;
  total_pages?: number;
}

interface ModalOpenProps {
  onCreate: () => void;
}

export function ListingCourses({ onCreate }: ModalOpenProps) {
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
      <Stack direction="row" mb={4}>
        <InputField
          type="text"
          label="Título do Curso"
          name="titleFilter"
          value={titleFilter}
          onChange={handleTitleChange}
          placeholder="Pesquisar"
        />
        <Box alignContent="end">
          <Button
            bg="black"
            border={"1px"}
            sx={{
              _hover: {
                backgroundColor: "black",
                boxShadow: "none",
              },
            }}
            color="white"
            borderRadius={"unset"}
            onClick={onCreate}
          >
            Criar curso
            <Box mb={1} ml={2}>
              <IoCreateOutline size={20} />
            </Box>
          </Button>
        </Box>
      </Stack>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="30px">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </SimpleGrid>
      <Flex
        justify="center"
        align="center"
        alignSelf="end"
        gap={6}
        mt={6}
        width="fit-content"
        borderWidth="1px"
        borderColor="black"
      >
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          isDisabled={page === 1}
          bg="black"
          color="white"
          borderRadius="none"
          _hover={{ bg: "blackAlpha.800" }}
          _disabled={{ bg: "gray.400", cursor: "not-allowed", color: "white" }}
        >
          <MdNavigateBefore size={20} color="white" />
        </Button>

        <Text fontSize="lg" fontWeight="medium">
          {`${data?.current_page} | ${data?.total_pages}`}
        </Text>

        <Button
          onClick={() => setPage((prev) => prev + 1)}
          isDisabled={data?.current_page === data?.total_pages}
          bg="black"
          color="white"
          borderRadius="none"
          _hover={{ bg: "blackAlpha.800" }}
          _disabled={{ bg: "gray.400", cursor: "not-allowed", color: "white" }}
        >
          <MdNavigateNext size={20} color="white" />
        </Button>
      </Flex>
    </Flex>
  );
}
