import { useRef } from "react";
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
  VStack,
  useDisclosure,
  useBreakpointValue,
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

  const modalSize = useBreakpointValue({ base: "full", md: "3xl" });
  const stackDirection = useBreakpointValue({ base: "column", md: "row" }) as
    | "column"
    | "row";
  const inputSize = useBreakpointValue({ base: "sm", md: "md" });
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
  const fontSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });

  return (
    <>
      <MenuToggle id={id} onEdit={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
        <ModalOverlay />
        <ModalContent
          bg="white"
          border="1px"
          borderColor="black"
          boxShadow="6px 6px 0 white"
          mx={2}
        >
          <ModalHeader fontSize={fontSize}>Editar Informações</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack mb={9} spacing={6} direction={stackDirection}>
              <VStack spacing={4} align="stretch" width="100%">
                <HStack justifyContent="space-between">
                  <Text fontWeight="bold" fontSize={fontSize}>
                    Tamanho:
                  </Text>
                  <Text fontSize={fontSize} color="gray.800">
                    {convertMbToGb(storage)}
                  </Text>
                </HStack>

                <HStack justifyContent="space-between">
                  <Text fontWeight="bold" fontSize={fontSize}>
                    Data de início:
                  </Text>
                  <Text fontSize={fontSize} color="gray.800">
                    {startDate
                      ? new Date(startDate).toLocaleDateString()
                      : "N/A"}
                  </Text>
                </HStack>

                <HStack justifyContent="space-between">
                  <Text fontWeight="bold" fontSize={fontSize}>
                    Data de término:
                  </Text>
                  <Text fontSize={fontSize} color="gray.800">
                    {endDate ? new Date(endDate).toLocaleDateString() : "N/A"}
                  </Text>
                </HStack>
              </VStack>
            </Stack>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel fontSize={fontSize}>Nome</FormLabel>
                <Input
                  name="name"
                  ref={nameRef}
                  defaultValue={title}
                  placeholder="Digite o nome"
                  bg="white"
                  border="1px"
                  borderColor="black"
                  boxShadow="6px 6px 0 black"
                  _focus={{
                    borderColor: "black",
                    boxShadow: "6px 6px 0 grey",
                    outline: "none",
                  }}
                  size={inputSize}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={fontSize}>Descrição</FormLabel>
                <Input
                  name="description"
                  ref={descriptionRef}
                  defaultValue={description}
                  placeholder="Digite a descrição"
                  bg="white"
                  border="1px"
                  borderColor="black"
                  boxShadow="6px 6px 0 black"
                  _focus={{
                    borderColor: "black",
                    boxShadow: "6px 6px 0 grey",
                    outline: "none",
                  }}
                  size={inputSize}
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="white"
              border="1px"
              borderColor="black"
              boxShadow="6px 6px 0 black"
              mr={3}
              onClick={handleSave}
              sx={{
                _hover: {
                  backgroundColor: "inherit",
                  boxShadow: "none",
                },
              }}
              size={buttonSize}
            >
              Salvar
            </Button>
            <Button
              bg="black"
              border="1px"
              borderColor="white"
              boxShadow="6px 6px 0 black"
              sx={{
                _hover: {
                  backgroundColor: "black",
                  boxShadow: "none",
                },
              }}
              variant="ghost"
              color="white"
              onClick={onClose}
              size={buttonSize}
            >
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
