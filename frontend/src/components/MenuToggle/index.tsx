import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { SlArrowDown } from "react-icons/sl";

export function MenuToggle({ onEdit }: { onEdit: () => void }) {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<SlArrowDown />}>
        Actions
      </MenuButton>
      <MenuList>
        <MenuItem onClick={onEdit}>Ver</MenuItem>
        <MenuItem>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
}
