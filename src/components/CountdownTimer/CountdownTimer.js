import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [seconds, setSeconds] = useState(5);
  const [minutes, setMinutes] = useState(1);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (seconds) {
        setSeconds(seconds - 1);
      } else if (minutes) {
        setSeconds(59);
        setMinutes(minutes - 1);
      } else if (hours) {
        setSeconds(59);
        setMinutes(59);
        setHours(hours - 1);
      }
    }, 1000);
  });

  const formatTime = (value) => (value <= 9 ? `0${value}` : value);
  return (
    <div>
      {hours ? <span>{formatTime(hours)} : </span> : ''}
      {<span>{formatTime(minutes)} : </span>}
      <span>{formatTime(seconds)}</span>
    </div>
  );
};

export default CountdownTimer;
