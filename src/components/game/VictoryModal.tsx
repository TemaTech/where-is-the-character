import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Button,
  Input,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { submitUserTime } from '../../config/firebase';

interface Props {
  time: string;
  allFound: boolean;
}

export const VictoryModal = ({ time, allFound }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [nickname, setNickname] = useState('');

  useEffect(() => {
    if (allFound) onOpen();
  }, [allFound]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Congratulations! You have found all characters in `{time}` minutes and seconds.</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb='3'>If you'd like to submit your time to the leaderboard, please enter your nickname in the input field below.</Text>
            <Input placeholder='Your nickname...' value={nickname} onChange={(e) => setNickname(e.target.value)} />
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => window.location.reload()}>Play Again</Button>
            <Button ml='3' colorScheme='orange' onClick={async () => {
              const userObj = {
                name: nickname,
                time: time,
              }
              await submitUserTime(userObj);
            }}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}