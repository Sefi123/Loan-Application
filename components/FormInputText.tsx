import {
  FormControl,
  IInputProps,
  Input,
  WarningOutlineIcon,
} from "native-base";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface Props extends IInputProps {
  name: string;
}

const FormInputText = ({ name, ...props }: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl isInvalid={errors[name] ? true : false} mb={3} ml="12">
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Input
            {...props}
            value={value as string}
            isFocused={errors[name] ? true : false}
            onChangeText={onChange}
          />
        )}
      />
      {errors[name]?.message && (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errors[name]?.message}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  );
};

export default FormInputText;
