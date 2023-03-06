import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  HStack,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import moment from "moment";

import { ReactComponent as EllipseIcon } from "../icons/ellipse.svg";
import { ReactComponent as PointsIcon } from "../icons/points.svg";
import { ReactComponent as UbicationIcon } from "../icons/ubication.svg";
import { fetchDistances } from "../services/api";
import { Distance } from "../types";

const Results = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const [distances, setDistances] = useState<Distance[]>([]);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [hasError, setError] = useState<boolean>(false);

  const date = new URLSearchParams(location.search).get("date");
  const passengers = new URLSearchParams(location.search).get("passengers");
  const cities = new URLSearchParams(location.search).get("cities")?.split(",");

  useEffect(() => {
    if (!date || !passengers || !cities?.length) {
      navigate("/");
    }
  }, [date, passengers, cities, navigate]);

  useEffect(() => {
    setIsCalculating(true);
    fetchDistances(cities || [])
      .then(setDistances)
      .catch(() => setError(true))
      .finally(() => setIsCalculating(false));
  }, []);

  const total = useMemo(
    () =>
      distances
        .reduce(
          (accumulator, currentValue) => accumulator + currentValue.distance,
          0
        )
        .toFixed(2),
    [distances]
  );

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      margin="auto"
      marginTop="16px !important"
      width="100%"
    >
      {isCalculating ? (
        <Stack>
          <Spinner
            color="red.500"
            emptyColor="gray.200"
            margin="auto"
            size="xl"
            speed="0.65s"
            thickness="4px"
          />
          <Text marginBottom="20px !important" marginTop="20px !important">
            Calculating results, please wait!
          </Text>
        </Stack>
      ) : hasError ? (
        <Text
          color="#7786D2"
          data-layer="error-message"
          fontSize={16}
          fontWeight={700}
          marginBottom="20px !important"
          marginTop="20px !important"
        >
          Oops! Something went wrong!
        </Text>
      ) : (
        <>
          {distances?.map(({ city, distance }, index) => {
            return (
              <VStack key={index} margin="0px !important" width="100%">
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
                      {city}
                    </Text>
                  </Box>
                </HStack>
                {index !== distances.length - 1 && (
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
                        paddingY={0.5}
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
              <Text
                color="#7786D2"
                data-layer="total"
                fontWeight={500}
              >{`${total} km`}</Text>
              <Text> is total distance.</Text>
            </HStack>
            <HStack>
              <Text color="#7786D2" data-layer="passengers" fontWeight={500}>
                {passengers}
              </Text>
              <Text>{`${
                Number(passengers) > 1 ? "passengers" : "passenger"
              }.`}</Text>
            </HStack>
            <Text color="#7786D2" data-layer="date" fontWeight={500}>
              {moment(date).format("ll")}
            </Text>
          </VStack>
        </>
      )}
      <Button
        variant="outline"
        onClick={() =>
          navigate({
            pathname: "/",
            search: `?passengers=${passengers}&date=${date}&cities=${cities?.join(
              ","
            )}`,
          })
        }
      >
        Back
      </Button>
    </Stack>
  );
};

export default Results;
