import { Input, Text, Box, RadioGroup, Stack, Radio } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

interface CustomRadioProps {
  data: string[];
  label: string;
  name: string;
  type: string;
}

export const CustomInput: React.FC<CustomRadioProps> = ({
  label,
  data,
  ...props
}) => {
  const [field] = useField(props);
  return (
    <Box my={3}>
      <Text fontWeight={400} fontSize={20}>
        {label}
      </Text>
      <RadioGroup {...field} {...props}>
        <Stack direction="row">
          {data.map((item) => (
            <Radio value={item} key={Math.random()}>
              First
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Box>
  );
};
