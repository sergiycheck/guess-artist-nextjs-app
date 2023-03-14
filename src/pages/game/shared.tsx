import { Box } from "@chakra-ui/react";

export function StyledBox1({ children }: { children: JSX.Element }) {
  return (
    <Box
      display="flex"
      flexGrow={1}
      justifyContent="center"
      flexDir="column"
      gap="3rem"
      width={{ base: "100%", md: "700px" }}
      margin="0 auto"
    >
      {children}
    </Box>
  );
}
