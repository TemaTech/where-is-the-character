import { Flex, Link, Text } from "@chakra-ui/layout";

export const Footer = () => {
  return (
    <Flex direction='column' gap={3} p={3} justify='center' align='center'>
      <Text color='gray.500'>Copyright (c) { new Date().getFullYear() } Chernysh Artem</Text>
      <Flex gap={3}>
        <Link color='gray.500' isExternal href='https://twitter.com/cherrartem'>My Twitter</Link>
        <Link color='gray.500' isExternal href='https://github.com/TemaTech'>My GitHub</Link>
      </Flex>
    </Flex>
  );
}