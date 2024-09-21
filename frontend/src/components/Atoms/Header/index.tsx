import { useQuery } from "@tanstack/react-query";
import { convertMbToGb } from "../../../helpers/getConvertMbToMb";
import { FaEarlybirds } from "react-icons/fa";
import { Box, Flex, Text } from "@chakra-ui/react";
import Api from "../../../api/course";

interface StorageNumber {
  storage: number | string;
}

const Header = () => {
  const { data, isLoading, isError, error } = useQuery<StorageNumber, Error>({
    queryKey: ["courses"],
    queryFn: () => Api.getCoursesStorageSum(),
  });

  if (isLoading) return <div>Carregando...</div>;

  if (isError) {
    return <div>Erro ao storage: {error.message}</div>;
  }

  const storage = data?.storage || 0;

  return (
    <Box
      as="header"
      bg="black"
      border={"1px"}
      borderColor="white"
      boxShadow={"6px 6px 0 black"}
      py={4}
      px={8}
      mb={10}
    >
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <Flex alignItems="center" gap={4}>
          <FaEarlybirds size={30} fontWeight="bold" color="white" />
          <Text fontSize="3xl" fontWeight="bold" color="white">
            Gwyto
          </Text>
        </Flex>

        <Flex gap={4}>
          <Text color="white" fontSize="sm" fontWeight="bold">
            Storage:
          </Text>
          <Text color="white" fontSize="sm" fontWeight="bold">
            {convertMbToGb(storage as number)}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
