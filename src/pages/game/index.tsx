import React from "react";
import { SharedHead } from "@/components/head";
import { Box, Button, Flex, FormControl, Input } from "@chakra-ui/react";

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

  const artist = useBoundStore((state) => state.artist);

  return (
    <>
      <SharedHead />
      <Box as="main" height="100%" display="flex" flexDir="column">
        <Box textStyle="h2">Game page</Box>
        {isLoading && <Box>Loading artist...</Box>}
        {artist && <Albums artist={artist} />}
      </Box>
    </>
  );
}

function UserAuthentication() {
  const [userName, setUserName] = React.useState("");

  const loginMutation = useMutation({
    mutationFn: (dto: LoginUserDto) => {
      return fetch(apiRoutes.users.login, {
        method: "POST",
        body: JSON.stringify(dto),
      }).then((res) => res.json() as Promise<User>);
    },
  });

  const loginHandler = async () => {
    const user = await loginMutation.mutateAsync({ name: userName });
  };

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
          <Flex justifyContent="center" width="100%">
            <Input
              maxWidth="400px"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              variant="flushed"
              placeholder="Creator of the album?"
            />
          </Flex>
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
