import {
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRef } from "react";

export default function CreateCourse() {
  const inputSize = useBreakpointValue({ base: "sm", md: "md" });

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <FormControl>
        <FormLabel>Título</FormLabel>
        <Input
          name="title"
          ref={titleRef}
          placeholder="Digite o título do curso"
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
        <FormLabel>Descrição</FormLabel>
        <Input
          name="description"
          ref={descriptionRef}
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
      <FormControl>
        <FormLabel>Data de Início</FormLabel>
        <Input
          type="date"
          name="start_date"
          ref={startDateRef}
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
        <FormLabel>Data de Término</FormLabel>
        <Input
          type="date"
          name="end_date"
          ref={endDateRef}
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
        <FormLabel>URL da Imagem</FormLabel>
        <Input
          type="text"
          name="image_url"
          ref={imageUrlRef}
          placeholder="Digite a URL da imagem"
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
    </>
  );
}
