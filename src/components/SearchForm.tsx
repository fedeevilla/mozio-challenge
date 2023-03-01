import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PlusSquareIcon } from "@chakra-ui/icons";
import { Button, Stack } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

import FormInput from "../components/FormInput";
import { ItemSelect } from "../types";
import DateInput from "./DateInput";
import PassengersInput from "./PassengersInput";

const SearchForm = (): JSX.Element => {
  const [passengers, setPassengers] = useState<number>(1);
  const [date, setDate] = useState<string>("");
  const navigate = useNavigate();

  const [inputFields, setInputFields] = useState<ItemSelect[]>([
    { id: uuidv4(), value: "", lat: 0, lon: 0, label: "" },
    { id: uuidv4(), value: "", lat: 0, lon: 0, label: "" },
  ]);

  const handleAdd = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), value: "", lat: 0, lon: 0, label: "" },
    ]);
  };

  const handleSubmit = () => {
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
        flexDirection={["column", "column", "row", "row"]}
        gap={10}
        justifyContent="center"
      >
        <Stack flex={1} justifyContent="flex-start">
          {inputFields.map((field, index) => (
            <FormInput
              key={field.id}
              title={`City of ${index === 0 ? "Origin" : "Destination"}`}
              value={field}
              onChange={(value) => handleChange(field.id, value)}
              onRemove={
                [0, 1].includes(index) ? null : () => handleRemove(field.id)
              }
            />
          ))}
          <Stack flexDirection="row" justifyContent="flex-start">
            <Button color="#7786D2" variant="link" onClick={handleAdd}>
              <PlusSquareIcon marginRight={2} /> Add destination
            </Button>
          </Stack>
        </Stack>
        <Stack margin="0px !important" maxW={["100%", "100%", 130, 200]}>
          <PassengersInput
            passengers={passengers}
            setPassengers={setPassengers}
          />
          <DateInput date={date} setDate={setDate} />
        </Stack>
      </Stack>
      <Stack flexDirection="row" justifyContent="center">
        <Button
          data-layer="submit-button"
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
