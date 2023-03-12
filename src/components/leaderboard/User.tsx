import { Flex, Text } from "@chakra-ui/layout";

interface Props {
  name: string;
  time: string;
}

export const User = ({ name, time }: Props) => {
  return (
    <Flex w='100%' p='3' bg='gray.700' borderRadius='5' justify='space-between'>
      <Text>{ name }</Text>
      <Text>{ time }</Text>
    </Flex>
  );
}