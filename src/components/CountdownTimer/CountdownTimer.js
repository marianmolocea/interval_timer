import React, { useState, useEffect } from 'react';

const convertHoursToSeconds = (hours) => {
  return hours * 60 * 60;
};

const convertMinutesToSeconds = (minutes) => {
  return minutes * 60;
};

const calculateTimeLeft = (hours, minutes, seconds) => {
  let timeLeft = 0;
  if (hours) {
    timeLeft += convertHoursToSeconds(hours);
  }
  if (minutes) {
    timeLeft += convertMinutesToSeconds(minutes);
  }
  return timeLeft + seconds;
};
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [seconds, setSeconds] = useState(10);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      if(seconds) {
        setSeconds(seconds - 1)
      } else if (minutes) {
        setSeconds(59)
        setMinutes(minutes - 1)
      } else if (hours) {
        setSeconds(59)
        setMinutes(59)
        setHours(hours - 1)
      }
    }, 1000);
  });

  return (
    <div>
      Hours: {hours} Minutes: {minutes} Seconds: {seconds}
    </div>
  );
};

export default CountdownTimer;
