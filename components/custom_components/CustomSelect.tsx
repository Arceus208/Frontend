import { Select, Text } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

interface CustomSelectProps {
  label: string;
  name: string;
  placeholder: string;
  category: string[];
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  category,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Text fontWeight={400}>{label}</Text>
      <Select isInvalid={!!meta.error} {...props} {...field}>
        {category.map((item, index) => (
          <option key={index + Math.random()}>{item}</option>
        ))}
      </Select>
      {meta.error && meta.touched && (
        <p style={{ color: "red" }}>{meta.error}</p>
      )}
    </>
  );
};
