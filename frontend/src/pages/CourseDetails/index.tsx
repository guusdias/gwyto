import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Api from "../../api/course";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import ICourse from "../../types/ICourse";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: course,
    isLoading,
    error,
  } = useQuery<ICourse, Error>({
    queryKey: ["course", id],
    queryFn: () => Api.getCourseById(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Text>Erro ao carregar informações do curso</Text>;
  }

  if (!course) {
    return <Text>Curso não encontrado</Text>;
  }

  return (
    <Box>
      <Heading>{course.title}</Heading>
      <Text>{course.description}</Text>
    </Box>
  );
};

export default CourseDetails;
