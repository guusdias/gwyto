import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MenuToggle } from "../MenuToggle";
import { convertMbToGb } from "../../helpers/getConvertMbToMb.ts";
import Api from "../../api/course";
import ICourse from "../../types/ICourse";
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
  Text,
  HStack,
} from "@chakra-ui/react";

interface ModalProps {
  storage: number;
  startDate?: Date | undefined;
  endDate?: Date | undefined;
  id: number;
  title: string;
  description: string;
}

export default function ModalEdit({
  storage,
  startDate,
  endDate,
  id,
  title,
  description,
}: ModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const mutation = useMutation<ICourse, Error, Partial<ICourse>>({
    mutationFn: (updatedCourse: Partial<ICourse>) =>
      Api.updateCourse(id, { ...updatedCourse, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error: Error) => {
      console.error("Erro ao atualizar curso:", error.message);
    },
  });

  const handleSave = () => {
    mutation.mutate({
      title: nameRef.current?.value || title,
      description: descriptionRef.current?.value || description,
      start_date: startDate,
      end_date: endDate,
      total_video_size: storage,
    });
    onClose();
  };

  return (
    <>
      <MenuToggle id={id} onEdit={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Informações</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack mb={9} spacing={6} flex={"row"}>
              <Stack spacing={4}>
                <HStack justifyContent="space-between">
                  <Text fontWeight="bold" fontSize="lg">
                    Tamanho:
                  </Text>
                  <Text fontSize="md" color="gray.800">
                    {convertMbToGb(storage)}
                  </Text>
                </HStack>

                <HStack justifyContent="space-between">
                  <Text fontWeight="bold" fontSize="lg">
                    Data de início:
                  </Text>
                  <Text fontSize="md" color="gray.800">
                    {startDate
                      ? new Date(startDate).toLocaleDateString()
                      : "N/A"}
                  </Text>
                </HStack>

                <HStack justifyContent="space-between">
                  <Text fontWeight="bold" fontSize="lg">
                    Data de término:
                  </Text>
                  <Text fontSize="md" color="gray.800">
                    {endDate ? new Date(endDate).toLocaleDateString() : "N/A"}
                  </Text>
                </HStack>
              </Stack>
            </Stack>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input
                  name="name"
                  ref={nameRef}
                  defaultValue={title}
                  placeholder="Digite o nome"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Input
                  name="description"
                  ref={descriptionRef}
                  defaultValue={description}
                  placeholder="Digite a descrição"
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
    </>
  );
}
