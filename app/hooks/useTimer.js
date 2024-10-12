import { useState, useEffect, useMemo } from 'react';

const useTimer = (initialMinutes = 0, initialSeconds = 0) => {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60 + initialSeconds);

  const formatTime = (time) => time.toString().padStart(2, '0');

  const { minutes, seconds, formattedTime } = useMemo(() => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return {
      minutes: mins,
      seconds: secs,
      formattedTime: `${formatTime(mins)}:${formatTime(secs)}`
    };
  }, [secondsLeft]);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timerId = setInterval(() => {
      setSecondsLeft(prevSeconds => {
        if (prevSeconds <= 1) {
          clearInterval(timerId);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [secondsLeft]);

  return { minutes, seconds, formattedTime };
};

export default useTimer;