import React, { useState, useEffect } from "react";


const Countdown = ({expiryDate}) => {
    const [currentTime, setCurrentTime] = useState(Date.now());

     const getTimeRemaining = (expiryDate) => {
  if (!expiryDate) return null;

  const distance = expiryDate - currentTime;

  if (distance <= 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  } 

  return {
    hours: Math.floor(distance / (1000 * 60 * 60)),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
};


const timeLeft = getTimeRemaining(expiryDate);

  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentTime(Date.now());
  }, 1000);

 return () => clearInterval(interval);
}, []);

if (!timeLeft) return null;

return (
  <div className="de_countdown">
    <div className="countdown">
      <span>{timeLeft.hours}h</span>
      <span>{timeLeft.minutes}m</span>
      <span>{timeLeft.seconds}s</span>
    </div>
  </div>
);
};

export default Countdown;
