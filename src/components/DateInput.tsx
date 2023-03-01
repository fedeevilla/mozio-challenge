import React from "react";

import { Box, Input, Text } from "@chakra-ui/react";
import moment from "moment";

interface Props {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
}
const DateInput = ({ date, setDate }: Props): JSX.Element => {
  return (
    <Box marginTop="16px !important">
      <Text fontSize={14} fontWeight="light">
        Date
      </Text>
      <Input
        borderColor={!date ? "red.500" : "inherit"}
        margin="0px !important"
        min={moment(new Date()).format("YYYY-MM-DD")}
        type="date"
        value={date}
        onChange={(ev) => setDate(ev.target.value)}
      />
    </Box>
  );
};

export default DateInput;
