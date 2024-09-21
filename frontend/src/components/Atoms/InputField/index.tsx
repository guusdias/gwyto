import { FormControl, FormLabel, Input } from "@chakra-ui/react";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
}: InputFieldProps) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </FormControl>
  );
};
