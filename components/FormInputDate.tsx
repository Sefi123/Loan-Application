import { FormControl, Icon, IInputProps, Input, Pressable } from "native-base";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";

interface Props extends IInputProps {
  name: string;
}

const FormInputDate = ({ name, ...props }: Props) => {
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [value, setDateValue] = React.useState<string | Date>(
    getValues(name).length
      ? getValues(name)
      : format(new Date(), "yyyy-MM-dd").toString()
  );
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDateValue(format(new Date(date), "yyyy-MM-dd").toString());
    setValue(name, format(new Date(date), "yyyy-MM-dd").toString());
    hideDatePicker();
  };
  React.useEffect(() => {
    setValue(name, format(new Date(), "yyyy-MM-dd").toString());
  }, []);

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={() => (
          <Input
            {...props}
            value={value as string}
            defaultValue={format(new Date(), "yyyy-MM-dd").toString()}
            isReadOnly
            InputRightElement={
              <Pressable
                onPress={() => setDatePickerVisibility(!isDatePickerVisible)}
              >
                <Icon
                  as={<Ionicons name="calendar" />}
                  size={8}
                  mr="2"
                  color="black"
                />
              </Pressable>
            }
          />
        )}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default FormInputDate;
