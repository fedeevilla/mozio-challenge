import { MouseEventHandler, useEffect, useState } from "react";
import Select from "react-select/async";

import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
} from "@chakra-ui/react";

import { fetchCity } from "../services/api";
import { ItemSelect } from "../types";

interface Props {
  title: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (i: ItemSelect) => void;
  onRemove?: MouseEventHandler<HTMLButtonElement> | null;
  value: ItemSelect;
}

const FormInput = ({
  title,
  onChange,
  onRemove,
  value,
}: Props): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<ItemSelect | null>(
    value
  );
  const [isError, setIsError] = useState(false);

  const handleOnChange = (option: ItemSelect | null) => {
    setSelectedOption(option);
    if (option) {
      onChange(option);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    setIsError([undefined, ""].includes(selectedOption?.value));
  }, [selectedOption?.value]);

  return (
    <Stack>
      <FormControl isInvalid={isError} marginBottom={3}>
        <FormLabel fontSize={14} fontWeight="light" margin={0}>
          {title}
        </FormLabel>
        <Stack
          alignItems="center"
          flexDirection="row"
          gap={4}
          margin="0px !important"
        >
          <Select
            isClearable
            defaultValue={value}
            loadOptions={fetchCity}
            placeholder="Select a city from the list!"
            styles={{
              container: (base) => ({
                ...base,
                flex: 1,
              }),
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: isError ? "red" : "inherit",
              }),
            }}
            value={selectedOption}
            onChange={handleOnChange}
          />
          {onRemove && (
            <Button margin="0px !important" onClick={onRemove}>
              <SmallCloseIcon />
            </Button>
          )}
        </Stack>
        {isError && (
          <FormErrorMessage
            fontSize={12}
          >{`${title} is required.`}</FormErrorMessage>
        )}
      </FormControl>
    </Stack>
  );
};

export default FormInput;
