import React from "react";

import {
  Text,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

interface Props {
  passengers: number;
  setPassengers: React.Dispatch<React.SetStateAction<number>>;
}

const PassengersInput = ({ passengers, setPassengers }: Props): JSX.Element => {
  return (
    <>
      <Text fontSize={14} fontWeight="light">
        Passengers
      </Text>
      <NumberInput
        borderColor={passengers <= 0 || !passengers ? "red.500" : "inherit"}
        defaultValue={passengers}
        margin="0px !important"
        min={1}
        onChange={(valueString) => setPassengers(Number(valueString))}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </>
  );
};

export default PassengersInput;
