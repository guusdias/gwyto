import { useQuery } from "@tanstack/react-query";
import { Box, Flex, Text } from "@chakra-ui/react";
import { convertMbToGb } from "../../../helpers/getConvertMbToMb";
import { GiOwl } from "react-icons/gi";
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
    <Box as="header" bg="teal.500" py={4} px={8} shadow="md" mb={10}>
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <Flex alignItems="center" gap={4}>
          <GiOwl width="200px" fontWeight="bold" color="white" />
          <Text fontSize="xl" fontWeight="bold" color="white">
            Gwyto
          </Text>
        </Flex>

        <Flex gap={4}>
          <Text>Armazenamento: </Text>
          <Text>{convertMbToGb(storage as number)}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
