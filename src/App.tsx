import { Route, Routes } from "react-router-dom";

import { Stack } from "@chakra-ui/react";

import Results from "./components/Results";
import SearchForm from "./components/SearchForm";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <div className="background" />
      <Stack
        bg="white"
        gap={12}
        justifyContent="space-between"
        padding={8}
        rounded="3xl"
        width={["90%", "90%", "90%", "50%"]}
        zIndex={1}
      >
        <Routes>
          <Route element={<SearchForm />} path="/" />
          <Route element={<Results />} path="results" />
        </Routes>
      </Stack>
    </div>
  );
};

export default App;
