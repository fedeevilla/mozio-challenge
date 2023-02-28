import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Stack, Text } from "@chakra-ui/react";

import "./App.css";
import Results from "./components/Results";
import SearchForm from "./components/SearchForm";
import { ItemSelect, mockData } from "./services/mockData";

const mockedOptions = mockData.map((item) => {
  return {
    value: item[0],
    label: item[0],
    lat: item[1],
    lon: item[2],
  };
}) as ItemSelect[];

const App = () => {
  const [options, setOptions] = useState<ItemSelect[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [distances, setDistances] = useState<ItemSelect[]>();
  const [passengers, setPassengers] = useState<number>(1);
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    async function fetchMockData() {
      return new Promise<ItemSelect[]>((resolve) => {
        setTimeout(() => {
          resolve(mockedOptions);
        }, 2000);
      });
    }
    setIsLoading(true);
    fetchMockData()
      .then((res) => setOptions(res))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="App">
      <Stack
        bg="white"
        display="flex"
        gap={12}
        justifyContent="space-between"
        maxWidth="90%"
        minHeight={350}
        minWidth={600}
        padding={10}
        rounded="3xl"
      >
        <Routes>
          <Route
            element={
              isLoading ? (
                <Text fontWeight={700} textAlign="center">
                  Loadings cities...
                </Text>
              ) : (
                <SearchForm
                  date={date}
                  distances={distances}
                  options={options}
                  passengers={passengers}
                  setDate={setDate}
                  setDistances={setDistances}
                  setPassengers={setPassengers}
                />
              )
            }
            path="/"
          />
          <Route
            element={
              <Results
                date={date}
                distances={distances}
                passengers={passengers}
              />
            }
            path="results"
          />
        </Routes>
      </Stack>
    </div>
  );
};

export default App;
