import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import moment from "moment";

import { ReactComponent as EllipseIcon } from "../icons/ellipse.svg";
import { ReactComponent as PointsIcon } from "../icons/points.svg";
import { ReactComponent as UbicationIcon } from "../icons/ubication.svg";
import { calculateDistance } from "../services/distance";
import { ItemSelect } from "../services/mockData";

interface Props {
  distances?: ItemSelect[];
  passengers?: number;
  date?: string;
}

const Results = ({ distances, passengers, date }: Props): JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!distances) {
      navigate("/");
    }
  }, [distances]);

  let total: number = 0;

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      margin="auto"
      maxW={500}
      width="100%"
    >
      {distances?.map((item, index) => {
        const distance = calculateDistance(
          distances[index].lat,
          distances[index].lon,
          distances[index + 1]?.lat,
          distances[index + 1]?.lon
        );

        total += distance || 0;

        return (
          <VStack key={item.id} margin="0px !important" width="100%">
            <HStack gap={2} margin="0px !important" width="100%">
              <Box width="48%" />
              <Box
                alignItems="center"
                display="flex"
                justifyContent="center"
                margin="0px !important"
                width="4%"
              >
                {index !== distances.length - 1 ? (
                  <EllipseIcon />
                ) : (
                  <UbicationIcon />
                )}
              </Box>
              <Box
                alignItems="center"
                display="flex"
                flexDirection="row"
                gap={2}
                justifyContent="end"
                width="48%"
              >
                <Text fontSize={14} textAlign="left" width="100%">
                  {item.label}
                </Text>
              </Box>
            </HStack>
            {!isNaN(distance) && (
              <HStack gap={2} margin="0px !important" width="100%">
                <Stack
                  alignItems="center"
                  flexDirection="row"
                  gap={2}
                  justifyContent="end"
                  margin="0px !important"
                  width="48%"
                >
                  <Text
                    border="1px"
                    borderColor="#7786D2"
                    color="#7786D2"
                    fontSize={14}
                    fontWeight={500}
                    paddingX={2}
                    paddingY={1}
                    rounded="base"
                  >
                    {`${distance.toFixed(2)} km`}
                  </Text>
                </Stack>
                <Box
                  alignItems="center"
                  display="flex"
                  justifyContent="center"
                  margin="0px !important"
                  width="4%"
                >
                  <PointsIcon />
                </Box>
                <Box width="48%" />
              </HStack>
            )}
          </VStack>
        );
      })}

      <VStack paddingY={10}>
        <HStack>
          <Text color="#7786D2" fontWeight={500}>{`${total.toFixed(
            2
          )} km`}</Text>
          <Text> is total distance.</Text>
        </HStack>
        <HStack>
          <Text color="#7786D2" fontWeight={500}>
            {passengers}
          </Text>
          <Text> passengers.</Text>
        </HStack>
        <Text color="#7786D2" fontWeight={500}>
          {moment(date).format("ll")}
        </Text>
      </VStack>
      <Button onClick={() => navigate("/")}>Back</Button>
    </Stack>
  );
};

export default Results;
