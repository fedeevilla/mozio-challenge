import React, { MouseEventHandler, useState } from "react";
import Select from "react-select";

import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
} from "@chakra-ui/react";

import { ItemSelect } from "~/services/mockData";

interface Props {
  title: string;
  options: ItemSelect[];
  onChange: (i: ItemSelect) => void;
  onRemove?: MouseEventHandler<HTMLButtonElement> | null;
  value: ItemSelect;
}

const FormInput = ({
  title,
  onChange,
  onRemove,
  options,
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

  return (
    <Stack>
      <FormControl isInvalid={isError} marginBottom={3}>
        <FormLabel fontSize={14} fontWeight="light" margin={0}>
          {title}
        </FormLabel>
        <Stack
          alignItems="center"
          display="flex"
          flexDirection="row"
          gap={4}
          margin="0px !important"
        >
          <Select
            isClearable
            defaultValue={value}
            options={options}
            placeholder="Select city from the list!"
            styles={{
              container: (base) => ({
                ...base,
                flex: 1,
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
