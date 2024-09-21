import { Button } from "@chakra-ui/react";
import { ReactElement } from "react";

interface ButtonAtomProps {
  onClick: () => void;
  label: string;
  icon?: ReactElement;
}

export const ButtonAtom = ({ onClick, label, icon }: ButtonAtomProps) => {
  return (
    <Button onClick={onClick} rightIcon={icon}>
      {label}
    </Button>
  );
};
