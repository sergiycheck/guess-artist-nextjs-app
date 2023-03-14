import { SharedHead } from "@/components/head";
import { Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { ArtistResponse, ListResponse } from "./types";

const baseURL = "http://127.0.0.1:3050";
const apiRoutes = {
  artists: {
    name: `${baseURL}/artists`,
    get all() {
      return `${this.name}/all`;
    },
  },
  albums: {
    name: `${baseURL}/itunes-api`,
    albumsByPredefinedArtist: function (term: string) {
      return `${this.name}/albums-by-predefined-artist?${new URLSearchParams(
        term
      ).toString()}`;
    },
  },

  users: {
    name: `${baseURL}/users`,
    get top3Users() {
      return `${this.name}/top-3`;
    },
    userById: function (id: string) {
      return `${this.name}/${id}`;
    },
  },
};

const queryKeys = {
  artists: "artists",
  albums: "albums",
  users: "users",
};

export default function Game() {
  const { isLoading, error, data } = useQuery({
    queryKey: [queryKeys.artists],
    queryFn: () =>
      fetch(apiRoutes.artists.all).then(
        (res) => res.json() as Promise<ListResponse<ArtistResponse>>
      ),
  });

  console.log(data);

  return (
    <>
      <SharedHead />
      <Box as="main">
        <Box textStyle="h2">Game page</Box>
      </Box>
    </>
  );
}
