import React, { useState, useEffect } from 'react';
import { Progress, TimePicker } from 'antd';
import moment from 'moment';

import './CountdownTimer.css';
import 'antd/dist/antd.css';

const totalMilliseconds = (h, m, s, ml = 0) => {
  const hoursToMlSec = h * 60 * 60 * 1000;
  const minToMlSec = m * 60 * 1000;
  const secToMl = s * 1000
  const totalML = hoursToMlSec + minToMlSec + secToMl + ml
  return totalML;
};

const calculatePercentage = (initialTime, timeLeft) =>
  (timeLeft * 100) / initialTime;

const CountdownTimer = ({ time, start = true, stop }) => {
  const [percentage, setPercentage] = useState(0);
  const [deadline, setDeadline] = useState(0);
  const [timer, setTimer] = useState({hours: 0, minutes: 0, seconds: 0, millisec: 0})

  useEffect(() => {
    setTimeout(() => {
      if(timer.millisec) {
        setTimer({...timer, millisec: timer.millisec - 25})
      } else if (timer.seconds) {
        setTimer({ ...timer, millisec: 1000, seconds: timer.seconds - 1 });
      } else if (timer.minutes) {
        setTimer({
          ...timer,
          millisec: 1000,
          seconds: 59,
          minutes: timer.minutes - 1,
        });
      } else if (timer.hours) {
        setTimer({
          millisec: 1000,
          seconds: 59,
          minutes: 59,
          hours: timer.hours - 1,
        });
      }
      setPercentage(
        calculatePercentage(
          deadline,
          totalMilliseconds(
            timer.hours,
            timer.minutes,
            timer.seconds,
            timer.millisec
          )
        )
      );
    }, 25);
  }, [deadline, timer]);

  const formatTime = (value) => (value <= 9 ? `0${value}` : value);

  const handleInputValue = (value) => {
    const hr = moment(value).toDate().getHours();
    const min = moment(value).toDate().getMinutes();
    const sec = moment(value).toDate().getSeconds();
    setTimer({
      seconds: sec,
      minutes: min,
      hours: hr,
      millisec: 0
    });
    setDeadline(totalMilliseconds(hr, min, sec));
  };

  return (
    <Progress
      type="circle"
      percent={percentage}
      width={'70vh'}
      strokeWidth={3}
      format={() => {
        if (!percentage) {
          return <TimePicker onOk={handleInputValue} />;
        } else {
          return (
            <div style={{color: 'white', fontSize: '32px'}}>
              {timer.hours ? <span>{formatTime(timer.hours)} : </span> : ''}
              {<span>{formatTime(timer.minutes)} : </span>}
              <span>{formatTime(timer.seconds + 1)}</span>
            </div>
          );
        }
      }}
    />
  );
};

export default CountdownTimer;
