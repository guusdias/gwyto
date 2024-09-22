import { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegTrashAlt, FaEdit, FaCheck } from "react-icons/fa";

import ICourse, { ILesson } from "../../types/ICourse";
import ApiLesson from "../../api/lesson";
import Api from "../../api/course";

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

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const urlRef = useRef<HTMLInputElement>(null);
  const sizeRef = useRef<HTMLInputElement>(null);

  const [editLessonId, setEditLessonId] = useState<number | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<ILesson | null>(null);

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
      setEditLessonId(null);
    },
  });

  const handleDeleteLesson = (lessonId: number) => {
    if (confirm("Tem certeza que deseja excluir essa aula?")) {
      deleteLessonMutation.mutate(lessonId);
    }
  };

  const handleEditLesson = (lesson: ILesson) => {
    setEditLessonId(lesson.id);
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
    <Flex p={5} flexDirection="column">
      <Button
        alignSelf={"start"}
        leftIcon={<IoIosArrowBack />}
        colorScheme="teal"
        onClick={() => navigate("/")}
        mb={4}
        bg="black"
        border="1px"
        borderColor="white"
        boxShadow="6px 6px 0 black"
        _hover={{ bg: "blackAlpha.800" }}
      >
        Voltar à Página Inicial
      </Button>

      <Flex flexGrow={1} direction={"column"}>
        <Image
          src={
            course.image_url ||
            "https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png"
          }
          alt={course.title}
          mr={4}
        />
        <Box mt={10}>
          <Heading fontSize={50} textAlign={"left"} mb={10}>
            {course.title}
          </Heading>
          <Text textAlign={"left"} fontSize={20}>
            {course.description}
          </Text>
        </Box>
      </Flex>
      <Heading fontSize={40} textAlign={"left"} size="md" mt={6} mb={6}>
        Aulas
      </Heading>
      <Stack
        spacing={0}
        bg="white"
        border="1px"
        borderColor="black"
        boxShadow="6px 6px 0 black"
      >
        {course.lessons?.map((lesson: ILesson, index) => (
          <Flex
            key={lesson.id}
            p={4}
            borderWidth={1}
            borderRadius="0px"
            bg="white"
            border="1px"
            borderColor="black"
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Flex
              alignItems="center"
              flexDirection={"row"}
              justifyContent={"space-between"}
              gap={4}
            >
              <Text>
                {editLessonId === lesson.id ? (
                  <Input ref={urlRef} defaultValue={lesson.url} />
                ) : (
                  <Button
                    variant="link"
                    onClick={() => setSelectedLesson(lesson)}
                    color={"black"}
                    textDecoration={"underline"}
                  >
                    {`Aula 0${index + 1} - ${lesson.url} `}
                  </Button>
                )}
              </Text>
              <Text>
                {editLessonId === lesson.id ? (
                  <Input ref={sizeRef} defaultValue={lesson.size.toString()} />
                ) : (
                  `${lesson.size} MB`
                )}
              </Text>
            </Flex>

            <Flex mt={2}>
              {editLessonId === lesson.id ? (
                <Button
                  leftIcon={<FaCheck />}
                  colorScheme="black"
                  color={"black"}
                  onClick={() => handleSaveLesson(lesson)}
                >
                  Salvar
                </Button>
              ) : (
                <>
                  <IconButton
                    aria-label="Editar Aula"
                    icon={<FaEdit />}
                    mr={2}
                    bgColor={"black"}
                    color={"white"}
                    borderColor={"white"}
                    borderWidth={2}
                    boxShadow="3px 3px 0 black"
                    borderRadius="unset"
                    onClick={() => handleEditLesson(lesson)}
                  />
                  <IconButton
                    aria-label="Excluir Aula"
                    icon={<FaRegTrashAlt />}
                    colorScheme="black"
                    color={"black"}
                    onClick={() => handleDeleteLesson(lesson.id)}
                  />
                </>
              )}
            </Flex>
          </Flex>
        ))}
      </Stack>

      {selectedLesson && (
        <Box mt={6}>
          <Heading size="md" fontSize={30}>
            Vídeo da Aula
          </Heading>
          <iframe
            src={selectedLesson.url}
            width="100%"
            height="400px"
            title="Aula Vídeo"
            allowFullScreen
          ></iframe>
        </Box>
      )}
    </Flex>
  );
};

export default CourseDetails;
