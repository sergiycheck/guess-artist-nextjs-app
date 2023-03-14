import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Image } from "@chakra-ui/react";

import { AlbumResponse, ArtistResponse, ListResponse, User } from "./types";
import { StyledModal } from "@/components/modal";
import { apiRoutes, queryKeys } from "./api-route";
import { StyledBox1 } from "./shared";
import { useBoundStore } from "./store/globa-state";
import axios from "axios";

export const useQueryRandomAlbumsAndSetToGameStore = ({
  artistName,
}: {
  artistName: string;
}) => {
  const setRandomAlbums = useBoundStore((store) => store.setRandomAlbums);

  const { isLoading, data } = useQuery({
    queryKey: [queryKeys.albums],
    queryFn: () =>
      fetch(
        apiRoutes.albums.randomAlbumsByArtist({
          size: 5,
          term: artistName,
        })
      ).then((res) => res.json() as Promise<ListResponse<AlbumResponse>>),
  });

  React.useEffect(() => {
    const length = data?.data.length;
    if (data && length) {
      setRandomAlbums(data.data);
    }
  }, [data, setRandomAlbums]);

  return { data, isLoading };
};

export function Albums({ artist }: { artist: ArtistResponse }) {
  const { isLoading } = useQueryRandomAlbumsAndSetToGameStore({
    artistName: artist.name,
  });

  const queryClient = useQueryClient();

  const randomAlbums = useBoundStore((store) => store.randomAlbums);

  const removeFirtRandomAlbum = useBoundStore(
    (store) => store.removeFirtRandomAlbum
  );

  const firstRandomAlbum = randomAlbums ? randomAlbums[0] : null;

  const [nameOfTheCreator, setNameOfTheCreator] = React.useState("");
  const [win, setWin] = React.useState<boolean | undefined>(undefined);
  const [count, setCount] = React.useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const resetQueries = () => {
    queryClient.resetQueries({
      queryKey: [queryKeys.artists],
    });
    queryClient.resetQueries({
      queryKey: [queryKeys.albums],
    });
  };

  const openaModalAndResetCount = () => {
    onOpen();
    setCount(0);
  };

  const setUser = useBoundStore((store) => store.setUser);
  const user = useBoundStore((store) => store.user)!;

  const updateUser = useMutation({
    mutationFn: (dto: Partial<User>) => {
      return axios.patch<User>(apiRoutes.users.userById(user.id), dto);
    },
    onSuccess: (data, variables, context) => {
      if (data.data) {
        setUser(data.data);
      }
    },
  });

  const userWinHandler = () => {
    const dto: Partial<User> = {
      id: user.id,
      points: user.points + 5,
    };
    updateUser.mutate(dto);
  };

  const submitFormGuessArtist = () => {
    setCount((prev) => prev + 1);

    const nameMatches =
      nameOfTheCreator.trim().toLowerCase() ===
      artist.name.trim().toLowerCase();

    if (nameMatches && count < 4) {
      setWin(true);
      userWinHandler();
      openaModalAndResetCount();
      resetQueries();
    } else if (count >= 4) {
      setWin(false);

      openaModalAndResetCount();
      resetQueries();
    } else {
      removeFirtRandomAlbum();
    }

    setNameOfTheCreator("");
  };

  let renderedModalContent: JSX.Element;
  if (win) {
    renderedModalContent = <Text fontSize="3xl">You win!</Text>;
  } else {
    renderedModalContent = <Text fontSize="3xl">You loose!</Text>;
  }

  return (
    <StyledBox1>
      <>
        {isLoading && (
          <Box display="flex" justifyContent="center" alignContent="center">
            Loading Albums...
          </Box>
        )}

        <Flex placeItems="center" flexDir="column" gap="2rem">
          <Box maxWidth="sm">
            <Image
              src={firstRandomAlbum?.artworkUrl100}
              alt={firstRandomAlbum?.collectionName}
            />
          </Box>
          <Text fontSize="md">Album {firstRandomAlbum?.collectionName}</Text>
          <Text fontSize="md">Remove me: {artist.name}</Text>
        </Flex>

        <FormControl
          as="form"
          display="flex"
          flexDir="column"
          gap="2rem"
          onSubmit={(e) => {
            e.preventDefault();
            submitFormGuessArtist();
          }}
        >
          <Flex justifyContent="center" width="100%">
            <Input
              value={nameOfTheCreator}
              onChange={(e) => {
                setNameOfTheCreator(e.target.value);
              }}
              variant="flushed"
              placeholder="Creator of the album?"
            />
          </Flex>
          <Flex justifyContent="end">
            <Button colorScheme="teal" size="lg" type="submit">
              Guess
            </Button>
          </Flex>
        </FormControl>

        <StyledModal title="Results" isOpen={isOpen} onClose={onClose}>
          {renderedModalContent}
        </StyledModal>
      </>
    </StyledBox1>
  );
}
