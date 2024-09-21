import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, Heading, Text, Spinner, Button, Stack } from "@chakra-ui/react";
import ICourse, { ILesson } from "../../types/ICourse";
import ApiLesson from "../../api/lesson";
import Api from "../../api/course";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const {
    data: course,
    isLoading,
    error,
  } = useQuery<ICourse, Error>({
    queryKey: ["course", id],
    queryFn: () => Api.getCourseById(Number(id)),
    enabled: !!id,
  });

  const deleteLessonMutation = useMutation({
    mutationFn: (lessonId: number) => {
      if (!id) {
        throw new Error("ID do curso não encontrado");
      }
      return ApiLesson.deleteLesson(Number(id), lessonId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course", Number(id)],
      });
    },
  });

  const handleDeleteLesson = (lessonId: number) => {
    if (confirm("Tem certeza que deseja excluir essa aula?")) {
      deleteLessonMutation.mutate(lessonId);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Text>Erro ao carregar informações do curso</Text>;
  }

  if (!course) {
    return <Text>Curso não encontrado</Text>;
  }
  console.log(course.lessons);
  return (
    <Box>
      <Heading>{course.title}</Heading>
      <Text>{course.description}</Text>

      <Heading size="md" mt={6}>
        Aulas
      </Heading>
      <Stack spacing={4}>
        {course.lessons?.map((lesson: ILesson) => (
          <Box key={lesson.id} p={4} borderWidth={1} borderRadius="md">
            <Text>
              <b>URL:</b> {lesson.url}
            </Text>
            <Text>
              <b>Tamanho:</b> {lesson.size} MB
            </Text>
            <Button
              colorScheme="red"
              onClick={() => handleDeleteLesson(lesson.id)}
            >
              Excluir Aula
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default CourseDetails;
