import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BsArrowUpRight } from "react-icons/bs";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import Api from "../../api/course";

interface MenuToggleProps {
  onEdit: () => void;
  id: string | number;
}

export function MenuToggle({ onEdit, id }: MenuToggleProps) {
  const useDeleteCourse = (id: number | string) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: () => Api.deleteCourse(id as number),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["courses"] });
      },
      onError: (error: Error) => {
        console.error("Erro ao deletar curso:", error.message);
      },
    });
  };

  const deleteCourseMutation = useDeleteCourse(id);

  const handleDelete = () => {
    deleteCourseMutation.mutate();
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        width="100%"
        iconSpacing={2}
        bg="transparent"
        sx={{
          _hover: {
            backgroundColor: "inherit",
            boxShadow: "none",
          },
        }}
      >
        <Flex
          flexDirection="row-reverse"
          justifyContent="space-between"
          alignItems="center"
        >
          <BsArrowUpRight />
          <Text>Ver Mais</Text>
        </Flex>
      </MenuButton>

      <MenuList
        bg="white"
        border={"1px"}
        borderColor="black"
        boxShadow={"6px 6px 0 black"}
      >
        <MenuItem onClick={onEdit}>Ver</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
}
