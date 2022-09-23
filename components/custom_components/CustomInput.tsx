import { Input, Text, Box } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

interface CustomInputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <Box>
      <Text fontWeight={400}>{label}</Text>
      <Input
        variant={"flushed"}
        isInvalid={!!meta.error}
        {...props}
        {...field}
        _placeholder={{ opacity: 0.6 }}
      ></Input>
      {meta.error && meta.touched && (
        <p style={{ color: "red" }}>{meta.error}</p>
      )}
    </Box>
  );
};
