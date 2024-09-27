import {
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRef } from "react";

export default function CreateLesson() {
  const inputSize = useBreakpointValue({ base: "sm", md: "md" });

  const urlRef = useRef<HTMLInputElement>(null);
  const sizeRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <FormControl>
        <FormLabel>URL da Aula</FormLabel>
        <Input
          name="url"
          ref={urlRef}
          placeholder="Digite a URL da aula"
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
        <FormLabel>Tamanho do Vídeo (MB)</FormLabel>
        <Input
          type="number"
          name="size"
          ref={sizeRef}
          placeholder="Digite o tamanho do vídeo"
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
