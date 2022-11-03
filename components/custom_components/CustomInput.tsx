import { Input, Text, Box } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

interface CustomInputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  min?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <Box my={3} mx={3}>
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
