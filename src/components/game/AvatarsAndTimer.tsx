import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Divider, Flex } from "@chakra-ui/layout";
import { useState } from "react";
import { Timer } from './Timer'
import { downloadCharacterAvatars } from "../../config/firebase";

interface Props {
  isLuigiFound: boolean;
  isBobOmbFound: boolean;
  isDonkeyKongFound: boolean;
  allFound: boolean;
  setTime: React.Dispatch<React.SetStateAction<string>>;
}

export const AvatarsAndTimer = ({ isLuigiFound, isBobOmbFound, isDonkeyKongFound, allFound, setTime }: Props) => {
  const [donkeyKongAvatar, setDonkeyKongAvatar] = useState<string | undefined>(undefined);
  const [bobOmbAvatar, setBobOmbAvatar] = useState<string | undefined>(undefined);
  const [luigiAvatar, setLuigiAvatar] = useState<string | undefined>(undefined);
  downloadCharacterAvatars(setLuigiAvatar, setBobOmbAvatar, setDonkeyKongAvatar);

  return (
    <Flex position='fixed' top='10%' mt='10px' direction='row' gap='5' p='5' bg='blackAlpha.600' backdropFilter='blur(25px)' border='1px solid' borderColor='gray.600' borderRadius='10'>
    <Avatar filter={isLuigiFound ? 'brightness(0.5)' : 'brightness(1)'} src={luigiAvatar} bg='gray.300' boxShadow='xl' />
    <Avatar filter={isBobOmbFound ? 'brightness(0.5)' : 'brightness(1)'} src={bobOmbAvatar} bg='gray.300' boxShadow='xl' />
    <Avatar filter={isDonkeyKongFound ? 'brightness(0.5)' : 'brightness(1)'} src={donkeyKongAvatar} bg='gray.300' boxShadow='xl' />
    <Divider orientation="vertical" h='50px' borderColor='gray.500' />
    <Flex direction='column' justify='center' align='center'>
      <Timer allFound={allFound} setTime={setTime} />
      <Button size='xs' variant='outline' onClick={() => {
        window.location.reload();
      }}>Restart</Button>
    </Flex>
  </Flex>
  );
}