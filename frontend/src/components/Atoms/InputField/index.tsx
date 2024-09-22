import { FormControl, FormLabel, Input } from "@chakra-ui/react";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const InputField = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder = "",
}: InputFieldProps) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        bg="white"
        border={"1px"}
        borderColor="black"
        borderRadius={"unset"}
        _focus={{
          borderColor: "black",
          boxShadow: "6px 6px 0 grey",
          outline: "none",
        }}
      />
    </FormControl>
  );
};
