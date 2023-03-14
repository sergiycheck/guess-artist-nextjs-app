import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

export function StyledLink({
  children,
  href,
}: {
  children: string;
  href: string;
}) {
  return (
    <Link
      as={NextLink}
      textStyle="a"
      href={href}
      _hover={{ textDecoration: "none" }}
    >
      {children}
    </Link>
  );
}
