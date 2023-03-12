import { Flex, Heading, Spacer } from "@chakra-ui/layout";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <Flex p='5' px='10' bg='blackAlpha.600' backdropFilter='blur(25px)' position='sticky' top='0' zIndex='999' borderBottom='1px solid' borderColor='gray.600'>
      <Link to='/'>
        <Heading size='md'>Where is the character?</Heading>
      </Link>
      <Spacer />
      <Link to='/leaderboard'>
        <Heading size='md' textDecor='underline'>Leaderboard</Heading>
      </Link>
    </Flex>
  );
}