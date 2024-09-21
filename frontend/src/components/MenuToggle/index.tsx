import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Api from "../../api/course";
import { SlArrowDown } from "react-icons/sl";

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
        iconSpacing={0}
        rightIcon={<SlArrowDown />}
      ></MenuButton>
      <MenuList>
        <MenuItem onClick={onEdit}>Ver</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
}
