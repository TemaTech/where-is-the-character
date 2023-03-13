import { Avatar } from "@chakra-ui/avatar";
import { Flex } from "@chakra-ui/layout";
import { doc, getDoc } from "@firebase/firestore";
import { getDownloadURL, ref } from "@firebase/storage";
import { useEffect, useState } from "react";
import { db, storage } from "../../config/firebase";

interface Props {
  isLuigiFound: boolean;
  isBobOmbFound: boolean;
  isDonkeyKongFound: boolean;
  x: number;
  y: number;
  setIsLuigiFound: React.Dispatch<React.SetStateAction<boolean>>;
  setIsBobOmbFound: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDonkeyKongFound: React.Dispatch<React.SetStateAction<boolean>>;
}

interface characterObj {
  xStart: string;
  xEnd: string;
  yStart: string;
  yEnd: string;
}

export const ClickMenu = ({ isLuigiFound, isBobOmbFound, isDonkeyKongFound, x, y, setIsLuigiFound, setIsBobOmbFound, setIsDonkeyKongFound }: Props) => {
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

  const [luigiCoordinates, setLuigiCoordinates] = useState<characterObj | undefined>(undefined);
  const [bobOmbCoordinates, setBobOmbCoordinates] = useState<characterObj | undefined>(undefined);
  const [donkeyKongCoordinates, setDonkeyKongCoordinates] = useState<characterObj | undefined>(undefined);

  useEffect(() => {
    const getData = async () => {
      try {
        const docRef = doc(db, "game", "characters");
        const document = await getDoc(docRef);

        setLuigiCoordinates(document.data()?.["Luigi"]);
        setBobOmbCoordinates(document.data()?.["Bob-omb"]);
        setDonkeyKongCoordinates(document.data()?.["Donkey Kong"]);
      } catch(err) {
        console.error("Error in loading character coordinates: ", err);
      }
    }

    getData();
  }, []);

  const checkClick = (characterCoordinates: characterObj | undefined, setCharacterFound: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (characterCoordinates && setCharacterFound) {
      if (x >= parseInt(characterCoordinates?.xStart) && x <= parseInt(characterCoordinates?.xEnd) && y >= parseInt(characterCoordinates?.yStart) && y <= parseInt(characterCoordinates?.yEnd)) {
        setCharacterFound(true);
      }
    }
  }

  return (
  <Flex position='absolute' top={`${y}%`} left={`${x}%`} direction='row' gap='5' p='5' bg='blackAlpha.600' backdropFilter='blur(25px)' border='1px solid' borderColor='gray.600' borderRadius='10'>
    <Avatar onClick={() => checkClick(luigiCoordinates, setIsLuigiFound)} filter={isLuigiFound ? 'brightness(0.5)' : 'brightness(1)'} src={luigiAvatar} bg='gray.300' boxShadow='xl' />
    <Avatar onClick={() => checkClick(bobOmbCoordinates, setIsBobOmbFound)} filter={isBobOmbFound ? 'brightness(0.5)' : 'brightness(1)'} src={bobOmbAvatar} bg='gray.300' boxShadow='xl' />
    <Avatar onClick={() => checkClick(donkeyKongCoordinates, setIsDonkeyKongFound)} filter={isDonkeyKongFound ? 'brightness(0.5)' : 'brightness(1)'} src={donkeyKongAvatar} bg='gray.300' boxShadow='xl' />
  </Flex>
  );
}