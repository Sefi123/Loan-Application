import { CheckIcon, IInputProps, Select } from "native-base";
import { InterfaceSelectProps } from "native-base/lib/typescript/components/primitives/Select/types";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface Props extends InterfaceSelectProps {
  name: string;
  options: { label: string; value: string }[];
}

const FormInputSelect = ({ name, options, ...props }: Props) => {
  const { control, setValue, getValues } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <Select
          {...props}
          selectedValue={value}
          onValueChange={onChange}
          minWidth="85%"
          //accessibilityLabel="Marital status"

          _selectedItem={{
            bg: "teal.100",
            endIcon: <CheckIcon size={5} />,
          }}
          //mt={1}

          // onValueChange={(itemValue) => setService(itemValue)}
        >
          {options.map(({ label, value }, index) => (
            <Select.Item label={label} value={value} key={index} />
          ))}
        </Select>
      )}
    />
  );
};

export default FormInputSelect;
