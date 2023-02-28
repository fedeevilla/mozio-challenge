import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

import FormInput from "../components/FormInput";
import { ItemSelect } from "../services/mockData";
interface Props {
  setDistances: React.Dispatch<React.SetStateAction<ItemSelect[] | undefined>>;
  setPassengers: React.Dispatch<React.SetStateAction<number>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  options: ItemSelect[];
  passengers: number;
  date: string;
  distances?: ItemSelect[];
}

const SearchForm = ({
  setDistances,
  setPassengers,
  setDate,
  options,
  passengers,
  distances,
  date,
}: Props): JSX.Element => {
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState<ItemSelect[]>(
    distances || [
      { id: uuidv4(), value: "", lat: 0, lon: 0, label: "" },
      { id: uuidv4(), value: "", lat: 0, lon: 0, label: "" },
    ]
  );

  const handleAdd = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), value: "", lat: 0, lon: 0, label: "" },
    ]);
  };

  const handleSubmit = () => {
    setDistances(inputFields);
    const selectedCities = inputFields.map(({ value }) => value);

    navigate({
      pathname: "/results",
      search: `?passengers=${passengers}&date=${date}&cities=${selectedCities.join(
        ","
      )}`,
    });
  };

  const handleRemove = (id: string) => {
    setInputFields(inputFields.filter((field) => field.id !== id));
  };

  const handleChange = (id: string, value: ItemSelect) => {
    setInputFields(
      inputFields.map((field) => {
        if (field.id === id) {
          return { ...field, ...value };
        } else {
          return field;
        }
      })
    );
  };

  return (
    <>
      <Stack
        display="flex"
        flexDirection="row"
        gap={10}
        justifyContent="center"
      >
        <Stack display="flex" flex="1" justifyContent="flex-start" maxW={300}>
          {inputFields.map((field, index) => (
            <FormInput
              key={field.id}
              options={options}
              title={`City of ${index === 0 ? "Origin" : "Destination"}`}
              value={field}
              onChange={(value) => handleChange(field.id, value)}
              onRemove={
                [0, 1].includes(index) ? null : () => handleRemove(field.id)
              }
            />
          ))}
          <Stack display="flex" flexDirection="row" justifyContent="flex-start">
            <Button color="#7786D2" variant="link" onClick={handleAdd}>
              <PlusSquareIcon marginRight={2} /> Add destination
            </Button>
          </Stack>
        </Stack>
        <Stack maxW={200}>
          <Text>Passengers</Text>
          <NumberInput
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
          <Text>Date</Text>
          <Input
            margin="0px !important"
            min={moment(new Date()).format("YYYY-MM-DD")}
            type="date"
            value={date}
            onChange={(ev) => setDate(ev.target.value)}
          />
        </Stack>
      </Stack>
      <Stack display="flex" flexDirection="row" justifyContent="center">
        <Button
          isDisabled={
            inputFields.some(({ value }) => value === "") ||
            passengers === 0 ||
            date === ""
          }
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Stack>
    </>
  );
};

export default SearchForm;
