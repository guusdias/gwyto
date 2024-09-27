import { Button } from "@chakra-ui/react";

interface CustomButtonProps {
  label: string;
  onClick: () => void;
  variant?: "solid" | "ghost";
  colorScheme?: string;
  bg?: string;
  borderColor?: string;
  boxShadow?: string;
  size?: string;
}

const CustomButton = ({
  label,
  onClick,
  variant = "solid",
  colorScheme = "blue",
  bg = "black",
  borderColor = "white",
  boxShadow = "6px 6px 0 black",
  size = "md",
}: CustomButtonProps) => {
  return (
    <Button
      colorScheme={colorScheme}
      onClick={onClick}
      bg={bg}
      border="1px"
      borderColor={borderColor}
      boxShadow={boxShadow}
      size={size}
      variant={variant}
      sx={{
        _hover: {
          backgroundColor: bg,
          boxShadow: "none",
        },
      }}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
