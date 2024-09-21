import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Heading,
  Text,
  Spinner,
  Button,
  Stack,
  Flex,
  IconButton,
  Input,
  Image,
} from "@chakra-ui/react";

import { IoIosArrowBack } from "react-icons/io";
import { FaRegTrashAlt, FaEdit, FaCheck } from "react-icons/fa";
import ICourse, { ILesson } from "../../types/ICourse";
import ApiLesson from "../../api/lesson";
import Api from "../../api/course";
import { useRef, useState } from "react";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Ref para manter a referência dos valores de edição
  const urlRef = useRef<HTMLInputElement>(null);
  const sizeRef = useRef<HTMLInputElement>(null);

  const [editLessonId, setEditLessonId] = useState<number | null>(null); // Gerencia o ID da aula em edição
  const [selectedLesson, setSelectedLesson] = useState<ILesson | null>(null); // Para exibir o vídeo

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

  const updateLessonMutation = useMutation({
    mutationFn: (updatedLesson: ILesson) => {
      if (!id) {
        throw new Error("ID do curso não encontrado");
      }
      return ApiLesson.updateLesson(
        Number(id),
        updatedLesson.id,
        updatedLesson
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course", Number(id)],
      });
      setEditLessonId(null); // Volta para modo de visualização após salvar
    },
  });

  const handleDeleteLesson = (lessonId: number) => {
    if (confirm("Tem certeza que deseja excluir essa aula?")) {
      deleteLessonMutation.mutate(lessonId);
    }
  };

  const handleEditLesson = (lesson: ILesson) => {
    setEditLessonId(lesson.id); // Define a aula a ser editada
    if (urlRef.current) urlRef.current.value = lesson.url;
    if (sizeRef.current) sizeRef.current.value = lesson.size.toString();
  };

  const handleSaveLesson = (lesson: ILesson) => {
    const updatedLesson = {
      ...lesson,
      url: urlRef.current?.value || lesson.url,
      size: parseInt(sizeRef.current?.value || lesson.size.toString(), 10),
    };
    updateLessonMutation.mutate(updatedLesson);
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

  console.log(course);

  return (
    <Box p={5}>
      <Button
        leftIcon={<IoIosArrowBack />}
        colorScheme="teal"
        onClick={() => navigate("/")}
        mb={4}
      >
        Voltar à Página Inicial
      </Button>

      <Heading>{course.title}</Heading>
      <Image
        src={course.image_url || "https://via.placeholder.com/50"}
        alt={course.title}
        mr={4}
      />
      <Text>{course.description}</Text>

      <Heading size="md" mt={6}>
        Aulas
      </Heading>
      <Stack spacing={4}>
        {course.lessons?.map((lesson: ILesson) => (
          <Box key={lesson.id} p={4} borderWidth={1} borderRadius="md">
            <Flex alignItems="center">
              <Text>
                <b>URL:</b>{" "}
                {editLessonId === lesson.id ? (
                  <Input ref={urlRef} defaultValue={lesson.url} />
                ) : (
                  <Button
                    variant="link"
                    onClick={() => setSelectedLesson(lesson)}
                  >
                    {lesson.url}
                  </Button>
                )}
              </Text>
            </Flex>

            <Text>
              <b>Tamanho:</b>{" "}
              {editLessonId === lesson.id ? (
                <Input ref={sizeRef} defaultValue={lesson.size.toString()} />
              ) : (
                `${lesson.size} MB`
              )}
            </Text>

            <Flex mt={2}>
              {editLessonId === lesson.id ? (
                <Button
                  leftIcon={<FaCheck />}
                  colorScheme="green"
                  onClick={() => handleSaveLesson(lesson)}
                >
                  Salvar
                </Button>
              ) : (
                <>
                  <IconButton
                    aria-label="Editar Aula"
                    icon={<FaEdit />}
                    colorScheme="blue"
                    mr={2}
                    onClick={() => handleEditLesson(lesson)}
                  />
                  <IconButton
                    aria-label="Excluir Aula"
                    icon={<FaRegTrashAlt />}
                    colorScheme="red"
                    onClick={() => handleDeleteLesson(lesson.id)}
                  />
                </>
              )}
            </Flex>
          </Box>
        ))}
      </Stack>

      {selectedLesson && (
        <Box mt={6}>
          <Heading size="md">Vídeo da Aula</Heading>
          <iframe
            src={selectedLesson.url}
            width="100%"
            height="400px"
            title="Aula Vídeo"
            allowFullScreen
          ></iframe>
        </Box>
      )}
    </Box>
  );
};

export default CourseDetails;
