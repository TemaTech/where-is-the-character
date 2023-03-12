import { Text } from "@chakra-ui/layout";
import { useEffect, useRef, useState } from "react";

interface Props {
  allFound: boolean;
  setTime: React.Dispatch<React.SetStateAction<string>>;
}

export const Timer = ({ allFound, setTime }: Props) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const secondsIntervalRef = useRef<NodeJS.Timeout | undefined>();
  const minutesIntervalRef = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    if (allFound) {
      const minutesString = minutes < 10 ? `0${minutes}` : minutes;
      const secondsString = seconds < 10 ? `0${seconds}` : seconds;
      const timeString = `${minutesString}:${secondsString}`;
      setTime(timeString);

      clearInterval(secondsIntervalRef.current);
      clearInterval(minutesIntervalRef.current);
    }
  }, [allFound, minutes, seconds, setTime]);



  useEffect(() => {
    if (!allFound) {
      secondsIntervalRef.current = setInterval(() => setSeconds((seconds) => seconds + 1), 1000);
    } else {
      clearInterval(secondsIntervalRef.current);
    }
    return () => clearInterval(secondsIntervalRef.current)
  }, [allFound]);

  useEffect(() => {
    if (!allFound) {
      minutesIntervalRef.current = setInterval(() => {
        setSeconds(0);
        setMinutes(minutes + 1);
      }, 60000);
      return () => clearInterval(minutesIntervalRef.current);
    }
  }, [minutes]);

  return (
    <Text>
      {
        minutes < 10 ?
          `0${minutes}`
          :
          minutes
      }
      :
      {
        seconds < 10?
          `0${seconds}`
          :
          seconds
      }
    </Text>
  );
}