import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICourseCreate, ILessonCreate } from "../../types/ICourse";
import Api from "../../api/course";
import ApiLesson from "../../api/lesson";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import CreateLesson from "./LessonModal";
import CreateCourse from "./CourseModal";
import CustomButton from "../Atoms/CustomButtom";

interface ModalCreateProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "course" | "lesson";
  courseId?: number;
}

export default function ModalCreate({
  isOpen,
  onClose,
  mode,
  courseId,
}: ModalCreateProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const sizeRef = useRef<HTMLInputElement>(null);

  const modalSize = useBreakpointValue({ base: "full", md: "3xl" });
  const stackSpacing = useBreakpointValue({ base: 3, md: 4 });
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  const queryClient = useQueryClient();

  const courseMutation = useMutation<ICourseCreate, Error, ICourseCreate>({
    mutationFn: (newCourse: ICourseCreate) => Api.createCourse(newCourse),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error: Error) => {
      console.error("Erro ao criar curso:", error.message);
    },
  });

  const lessonMutation = useMutation<ILessonCreate, Error, ILessonCreate>({
    mutationFn: (newLesson: ILessonCreate) => {
      if (!courseId) throw new Error("ID do curso não encontrado");
      return ApiLesson.createLesson(courseId, newLesson);
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["course", courseId] });
    },
    onError: (error: Error) => {
      console.error("Erro ao criar aula:", error.message);
    },
  });

  const handleSave = () => {
    if (mode === "course") {
      courseMutation.mutate({
        title: titleRef.current?.value || "",
        description: descriptionRef.current?.value || "",
        image_url: imageUrlRef.current?.value || "",
        start_date: startDateRef.current?.value
          ? new Date(startDateRef.current.value)
          : undefined,
        end_date: endDateRef.current?.value
          ? new Date(endDateRef.current.value)
          : undefined,
        total_video_size: 0,
      });
    } else if (mode === "lesson" && courseId) {
      lessonMutation.mutate({
        url: urlRef.current?.value || "",
        size: sizeRef.current?.value ? parseInt(sizeRef.current?.value, 10) : 0,
      });
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
      <ModalOverlay />
      <ModalContent
        bg="white"
        border="1px"
        borderColor="black"
        boxShadow="6px 6px 0 white"
        mx={2}
      >
        <ModalHeader>
          {mode === "course" ? "Criar Curso" : "Criar Aula"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={stackSpacing}>
            {mode === "course" && (
              <>
                <CreateCourse />
              </>
            )}

            {mode === "lesson" && (
              <>
                <CreateLesson />
              </>
            )}
          </Stack>
        </ModalBody>

        <ModalFooter gap={3}>
          <CustomButton
            label="Salvar"
            onClick={handleSave}
            bg="black"
            borderColor="white"
            boxShadow="6px 6px 0 black"
            size={buttonSize}
          />
          <CustomButton
            label="Fechar"
            onClick={onClose}
            variant="ghost"
            bg="white"
            borderColor="black"
            boxShadow="6px 6px 0 black"
            colorScheme="black"
            size={buttonSize}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
