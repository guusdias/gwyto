import { useState } from "react";
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
  startDate: Date;
  endDate: Date;
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
  const [formData, setFormData] = useState({
    name: title,
    description: description,
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    mutation.mutate({
      title: formData.name,
      description: formData.description,
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
                    {new Date(startDate).toLocaleDateString()}
                  </Text>
                </HStack>

                <HStack justifyContent="space-between">
                  <Text fontWeight="bold" fontSize="lg">
                    Data de término:
                  </Text>
                  <Text fontSize="md" color="gray.800">
                    {new Date(endDate).toLocaleDateString()}
                  </Text>
                </HStack>
              </Stack>
            </Stack>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Digite o nome"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Input
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
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
