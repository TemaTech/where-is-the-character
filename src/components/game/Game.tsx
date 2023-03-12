import { Image } from "@chakra-ui/image";
import { Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { downloadBG } from "../../config/firebase";
import { AvatarsAndTimer } from './AvatarsAndTimer'
import { ClickMenu } from './ClickMenu'
import { VictoryModal } from './VictoryModal'

export const Game = () => {
  const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);
  downloadBG(setImgUrl);

  const [isLuigiFound, setIsLuigiFound] = useState(false);
  const [isBobOmbFound, setIsBobOmbFound] = useState(false);
  const [isDonkeyKongFound, setIsDonkeyKongFound] = useState(false);

  const [allFound, setAllFound] = useState(false);

  const [clickCoordinates, setClickCoordinates] = useState<{ x: number, y: number } | null>(null);

  useEffect(() => {
    if (isLuigiFound && isBobOmbFound && isDonkeyKongFound) setAllFound(true);
  }, [isLuigiFound, isBobOmbFound, isDonkeyKongFound]);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const x = (e.nativeEvent.offsetX / e.currentTarget.clientWidth) * 100;
    const y = (e.nativeEvent.offsetY / e.currentTarget.clientHeight) * 100;
    setClickCoordinates({x, y});
    hasClicked ? setHasClicked(false) : setHasClicked(true);
  }

  const [hasClicked, setHasClicked] = useState(false);

  const [time, setTime] = useState('');

  return (
    <Flex position='relative' w='100%' h='100%' justify='center' align='center'>
      <Image src={imgUrl} w='100vw' onClick={handleImageClick} />
      {
        hasClicked && clickCoordinates &&
        <ClickMenu isLuigiFound={isLuigiFound} isBobOmbFound={isBobOmbFound} isDonkeyKongFound={isDonkeyKongFound} x={clickCoordinates.x} y={clickCoordinates.y} setIsLuigiFound={setIsLuigiFound} setIsBobOmbFound={setIsBobOmbFound} setIsDonkeyKongFound={setIsDonkeyKongFound} />
      }
      <VictoryModal time={time} allFound={allFound} />
      <AvatarsAndTimer allFound={allFound} setTime={setTime} isLuigiFound={isLuigiFound} isBobOmbFound={isBobOmbFound} isDonkeyKongFound={isDonkeyKongFound} />
    </Flex>
  );
}