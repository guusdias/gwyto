import { useQuery } from "@tanstack/react-query";
import { convertMbToGb } from "../../../helpers/getConvertMbToMb";
import { FaEarlybirds } from "react-icons/fa";
import { Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import Api from "../../../api/course";

interface StorageNumber {
  storage: number | string;
}

const Header = () => {
  const { data, isLoading, isError, error } = useQuery<StorageNumber, Error>({
    queryKey: ["courses"],
    queryFn: () => Api.getCoursesStorageSum(),
  });

  const fontSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });
  const padding = useBreakpointValue({ base: 4, md: 6, lg: 8 });
  const gap = useBreakpointValue({ base: 2, md: 3, lg: 4 });

  if (isLoading) return console.log("Carregando storage...");
  if (isError) {
    return console.log(`Erro ao storage: ${error.message}`);
  }

  const storage = data?.storage || 0;

  return (
    <Box
      as="header"
      bg="black"
      border="1px"
      borderColor="white"
      boxShadow="6px 6px 0 black"
      py={padding}
      px={padding}
      mb={10}
      width="100%"
    >
      <Flex
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        direction={{ base: "column", md: "row" }}
        gap={{ base: 4, md: 0 }}
      >
        <Flex alignItems="center" gap={gap}>
          <FaEarlybirds size={25} fontWeight="bold" color="white" />
          <Text fontSize={fontSize} fontWeight="bold" color="white">
            Gwyto
          </Text>
        </Flex>
        <Flex gap={gap}>
          <Text color="white" fontSize={fontSize} fontWeight="bold">
            Storage:
          </Text>
          <Text color="white" fontSize={fontSize} fontWeight="bold">
            {convertMbToGb(storage as number)}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
