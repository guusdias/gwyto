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

  return (
    <Flex p={5} flexDirection="column">
      <Button
        alignSelf={"start"}
        leftIcon={<IoIosArrowBack />}
        color="white"
        onClick={() => navigate("/")}
        mb={4}
        bg="black"
        border="1px"
        borderColor="white"
        boxShadow="6px 6px 0 black"
        _hover={{ bg: "blackAlpha.800" }}
        borderRadius={"unset"}
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
          maxWidth={["100%", "100%", "50%"]}
          mr={[0, 0, 4]}
          mb={[4, 4, 0]}
        />
        <Box mt={10}>
          <Heading fontSize={["3xl", "4xl", "5xl"]} textAlign="left" mb={4}>
            {course.title}
          </Heading>
          <Text textAlign="left" fontSize={["md", "lg", "xl"]}>
            {course.description}
          </Text>
        </Box>
      </Flex>
      <Heading
        textAlign={"left"}
        size="md"
        mt={6}
        mb={6}
        fontSize={["md", "lg", "xl"]}
      >
        Aulas
      </Heading>
      <Stack spacing={0} bg="white" border="1px" borderColor="black">
        {course.lessons?.map((lesson: ILesson, index) => (
          <Flex
            key={lesson.id}
            p={3}
            borderWidth={1}
            borderRadius="0px"
            bg="white"
            border="1px"
            borderColor="black"
            flexDirection={["column", "row"]}
            justifyContent="space-between"
            alignItems={["flex-start", "center"]}
            width={["110%", "auto"]}
            boxShadow="6px 6px 0 black"
          >
            <Flex
              alignItems="center"
              flexDirection={["column", "row"]}
              justifyContent="space-between"
              gap={2}
              mb={[2, 0]}
              width={["100%", "auto"]}
            >
              <Text fontSize={["sm", "md"]}>
                {editLessonId === lesson.id ? (
                  <Input ref={urlRef} defaultValue={lesson.url} size="sm" />
                ) : (
                  <Button
                    variant="link"
                    onClick={() => setSelectedLesson(lesson)}
                    color="black"
                    textDecoration="underline"
                    fontSize={["sm", "md"]}
                    width="100%"
                    justifyContent="flex-start"
                    px={0}
                  >
                    <Text
                      wordBreak="break-word"
                      whiteSpace="normal"
                      overflow="hidden"
                    >
                      {`Aula 0${index + 1} - ${lesson.url}`}
                    </Text>
                  </Button>
                )}
              </Text>
              <Text fontSize={["sm", "md"]}>
                {editLessonId === lesson.id ? (
                  <Input
                    ref={sizeRef}
                    defaultValue={lesson.size.toString()}
                    size="sm"
                  />
                ) : (
                  `${lesson.size} MB`
                )}
              </Text>
            </Flex>

            <Flex mt={[2, 0]}>
              {editLessonId === lesson.id ? (
                <Button
                  leftIcon={<FaCheck />}
                  colorScheme="black"
                  color="black"
                  onClick={() => handleSaveLesson(lesson)}
                  size="sm"
                >
                  Salvar
                </Button>
              ) : (
                <>
                  <IconButton
                    aria-label="Editar Aula"
                    icon={<FaEdit />}
                    mr={2}
                    bgColor="black"
                    color="white"
                    borderColor="white"
                    borderWidth={2}
                    boxShadow="3px 3px 0 black"
                    borderRadius="unset"
                    _hover={{ bg: "black" }}
                    onClick={() => handleEditLesson(lesson)}
                    size="sm"
                  />
                  <IconButton
                    aria-label="Excluir Aula"
                    icon={<FaRegTrashAlt />}
                    colorScheme="black"
                    color="black"
                    onClick={() => handleDeleteLesson(lesson.id)}
                    size="sm"
                  />
                </>
              )}
            </Flex>
          </Flex>
        ))}
      </Stack>

      {selectedLesson && (
        <Box mt={6}>
          <Heading size="md" fontSize={["xl", "2xl", "3xl"]} mb={3}>
            Vídeo da Aula
          </Heading>
          <Box position="relative" paddingTop="56.25%">
            <iframe
              src={selectedLesson.url}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              title="Aula Vídeo"
              allowFullScreen
            ></iframe>
          </Box>
        </Box>
      )}
    </Flex>
  );
};

export default CourseDetails;
