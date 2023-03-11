import { Button } from "@chakra-ui/button";
import { Flex, Heading, Text } from "@chakra-ui/layout";

export const Home = () => {
  return (
    <Flex direction='column' gap='5' align='center' justify='center' h='100%' p='10'>
      <Heading textAlign='center' size='2xl'>Where is the character?</Heading>
      <Text w={{ base: '100%', md:'75%', lg: '60%' }} textAlign='center' fontWeight='bold' color='gray.300' fontSize='lg'>Embark on an epic adventure through the Nintendo 64 console and join a thrilling quest to uncover hidden characters in this exciting new game!</Text>
      <Button size='lg' colorScheme='red' variant='outline'>Play Now!</Button>
    </Flex>
  );
}