import React from "react";
import { SharedHead } from "@/components/head";
import { Box } from "@chakra-ui/react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Image } from "@chakra-ui/react";

import { getRandomIntInclusive } from "@/utils/random-int";
import { ArtistResponse, ListResponse } from "./types";
import { apiRoutes, queryKeys } from "./api-route";
import { useGameStore } from "./game-state";
import { Albums } from "./albums";

export const useQueryArtistsAndSetRandomArtist = () => {
  const { isLoading, data } = useQuery({
    queryKey: [queryKeys.artists],
    queryFn: () =>
      fetch(apiRoutes.artists.all).then(
        (res) => res.json() as Promise<ListResponse<ArtistResponse>>
      ),
  });

  const setArtist = useGameStore((state) => state.setArtist);

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

  const artist = useGameStore((state) => state.artist);

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
