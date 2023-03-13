import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Divider, Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { Timer } from './Timer'
import { storage } from "../../config/firebase";
import { getDownloadURL, ref } from "@firebase/storage";

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
  
  useEffect(() => {
    const getData = async () => {
      const luigiAvatarRef = ref(storage, "gs://where-is-the-character.appspot.com/dbluu19-00099188-0f27-44ed-aab2-db513c66ef20.png");
      const bobOmbAvatarRef = ref(storage, "gs://where-is-the-character.appspot.com/dfcopdq-3e38c893-e09a-4f34-aac6-6921ea81e2d3.png");
      const donkeyKongAvatarRef = ref(storage, "gs://where-is-the-character.appspot.com/54f2862be0933.png");
      
      const luigiUrl = await getDownloadURL(luigiAvatarRef);
      const bobOmbAvatarUrl = await getDownloadURL(bobOmbAvatarRef);
      const donkeyKongAvatarUrl = await getDownloadURL(donkeyKongAvatarRef);

      setLuigiAvatar(luigiUrl);
      setBobOmbAvatar(bobOmbAvatarUrl);
      setDonkeyKongAvatar(donkeyKongAvatarUrl);
    }

    getData();
  }, []);

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