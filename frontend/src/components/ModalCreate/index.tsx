import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICourseCreate } from "../../types/ICourse";
import Api from "../../api/course";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";

interface ModalCreateCourseProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalCreateCourse({
  isOpen,
  onClose,
}: ModalCreateCourseProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const videoSizeRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const mutation = useMutation<ICourseCreate, Error, ICourseCreate>({
    mutationFn: (newCourse: ICourseCreate) => Api.createCourse(newCourse),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error: Error) => {
      console.error("Erro ao criar curso:", error.message);
    },
  });

  const handleSave = () => {
    mutation.mutate({
      title: titleRef.current?.value || "",
      description: descriptionRef.current?.value || "",
      image_url: imageUrlRef.current?.value || "",
      start_date: startDateRef.current?.value
        ? new Date(startDateRef.current.value)
        : undefined,
      end_date: endDateRef.current?.value
        ? new Date(endDateRef.current.value)
        : undefined,
      total_video_size: videoSizeRef.current?.value
        ? parseInt(videoSizeRef.current?.value, 10)
        : 0,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Criar Curso</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Título</FormLabel>
              <Input
                name="title"
                ref={titleRef}
                placeholder="Digite o título do curso"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Descrição</FormLabel>
              <Input
                name="description"
                ref={descriptionRef}
                placeholder="Digite a descrição"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Data de Início</FormLabel>
              <Input type="date" name="start_date" ref={startDateRef} />
            </FormControl>
            <FormControl>
              <FormLabel>Data de Término</FormLabel>
              <Input type="date" name="end_date" ref={endDateRef} />
            </FormControl>
            <FormControl>
              <FormLabel>URL da Imagem</FormLabel>
              <Input
                type="text"
                name="total_video_size"
                ref={imageUrlRef}
                placeholder="Digite o tamanho total do vídeo"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Tamanho total do vídeo (MB)</FormLabel>
              <Input
                type="number"
                name="total_video_size"
                ref={videoSizeRef}
                placeholder="Digite o tamanho total do vídeo"
              />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Salvar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
