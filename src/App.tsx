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
        display="flex"
        gap={12}
        justifyContent="space-between"
        maxWidth="90%"
        minHeight={350}
        minWidth={600}
        padding={10}
        rounded="3xl"
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
