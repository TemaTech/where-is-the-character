import { Flex, Heading } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { getTopUsers } from "../../config/firebase";
import { User } from './User'

interface UserStats {
  name: string;
  time: string;
}

export const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<UserStats[]>();
  getTopUsers(setLeaderboard);

  return (
    <Flex bg='gray.800' p='3' gap='5' direction='column' align='flex-start' borderRadius='5' width='75%'>
      <Heading color='gray.400'>Leaderboard - Top 5 Users by Time</Heading>
      <Flex direction='column' gap='3' width='100%'>
        {
          leaderboard && leaderboard.map((user) => (
            <User name={user.name} time={user.time} />
          ))
        }
      </Flex>
    </Flex>
  );
}