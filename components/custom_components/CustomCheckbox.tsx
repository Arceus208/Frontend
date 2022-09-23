import { Checkbox, Text } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

interface CustomCheckboxProps {
  label: string;
  name: string;
  value: string;
  type: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Checkbox {...field} {...props}>
        {label}
      </Checkbox>
    </>
  );
};
