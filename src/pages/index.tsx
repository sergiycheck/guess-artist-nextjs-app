import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { SharedHead } from "@/components/head";

export default function Home() {
  return (
    <>
      <SharedHead />
      <Box as="main">
        <Box textStyle="h2">Guess artist game home page</Box>
      </Box>
    </>
  );
}
