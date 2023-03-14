import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

import { useMutation, useQuery } from "@tanstack/react-query";

import { getRandomIntInclusive } from "@/utils/random-int";
import { ArtistResponse, ListResponse, LoginUserDto, User } from "./types";
import { apiRoutes, queryKeys } from "./api-route";
import { Albums } from "./albums";
import { StyledBox1 } from "./shared";
import { useBoundStore } from "./store/globa-state";

export const useQueryArtistsAndSetRandomArtist = () => {
  const { isLoading, data } = useQuery({
    queryKey: [queryKeys.artists],
    queryFn: () =>
      fetch(apiRoutes.artists.all).then(
        (res) => res.json() as Promise<ListResponse<ArtistResponse>>
      ),
  });

  const setArtist = useBoundStore((state) => state.setArtist);

  React.useEffect(() => {
    const length = data?.data.length;

    if (data && length) {
      const randomArtistIndex = getRandomIntInclusive(0, length - 1);
      setArtist(data.data[randomArtistIndex]);
    }
  }, [data, setArtist]);

  return { isLoading };
};

export default function Game() {
  const { isLoading } = useQueryArtistsAndSetRandomArtist();

  const user = useBoundStore((store) => store.user);

  let renderedPart: JSX.Element;
  if (user) {
    renderedPart = <AlbumsWithUser />;
  } else {
    renderedPart = <UserAuthentication />;
  }

  return (
    <Box as="main" height="100%" display="flex" flexDir="column">
      <Box textStyle="h2">Game page</Box>
      {isLoading && <Box>Loading artist...</Box>}
      {renderedPart}
    </Box>
  );
}

function AlbumsWithUser() {
  const user = useBoundStore((store) => store.user);
  const removeUser = useBoundStore((store) => store.removeUser);
  const artist = useBoundStore((state) => state.artist);

  return (
    <Box>
      <Flex justifyContent="end" gap="2rem" alignItems="center">
        <Text fontSize="2xl">
          User: {user?.name}, Points: {user?.points}
        </Text>
        <Button
          colorScheme="teal"
          size="lg"
          onClick={() => {
            removeUser();
          }}
        >
          Log out
        </Button>
      </Flex>
      {artist ? <Albums artist={artist} /> : <></>}
    </Box>
  );
}

function UserAuthentication() {
  const [userName, setUserName] = React.useState("");
  const setUser = useBoundStore((store) => store.setUser);

  const loginMutation = useMutation({
    mutationFn: (dto: LoginUserDto) => {
      return fetch(apiRoutes.users.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dto),
      })
        .then(async (res) => {
          if (res.ok) {
            return res.json() as Promise<User>;
          }
          const err = await res.json();
          throw new Error(err.message);
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
    onSuccess: (data, variables, context) => {
      if (data) {
        setUser(data);
      }
    },
  });

  const loginHandler = async () => {
    loginMutation.mutate({ name: userName });
  };

  const { isError } = loginMutation;

  return (
    <StyledBox1>
      <>
        <FormControl
          as="form"
          onSubmit={(e) => {
            e.preventDefault();
            loginHandler();
          }}
        >
          <FormControl
            justifyContent="center"
            width="100%"
            flexDir="column"
            alignItems="center"
          >
            <FormLabel>Username</FormLabel>
            <Input
              maxWidth="400px"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              variant="flushed"
            />

            {!isError ? (
              <FormHelperText>Enter your username</FormHelperText>
            ) : (
              <FormErrorMessage>Username is required.</FormErrorMessage>
            )}
          </FormControl>

          <Flex justifyContent="end">
            <Button colorScheme="teal" size="lg" type="submit">
              Login
            </Button>
          </Flex>
        </FormControl>
      </>
    </StyledBox1>
  );
}
