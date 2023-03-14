import Head from "next/head";
import { Inter } from "next/font/google";
import { Box } from "@chakra-ui/react";
import { SharedHead } from "@/components/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <SharedHead />
      <Box as="main" className={inter.className}>
        <Box textStyle="h2">Guess artist game home page</Box>
      </Box>
    </>
  );
}
