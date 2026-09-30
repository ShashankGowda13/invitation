import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        DAYS: Math.floor(difference / (1000 * 60 * 60 * 24)),
        HOURS: Math.floor((difference / (1000 * 60 * 60)) % 24),
        MINS: Math.floor((difference / 1000 / 60) % 60),
        SECS: Math.floor((difference / 1000) % 60)
      };
    } else {
        timeLeft = { DAYS: 0, HOURS: 0, MINS: 0, SECS: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    timerComponents.push(
      <div key={interval} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 10px' }}>
        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--gold)' }}>
          {String(timeLeft[interval]).padStart(2, '0')}
        </div>
        <div style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '1px' }}>
          {interval}
        </div>
      </div>
    );
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#1a1a1a', padding: '15px', borderRadius: '15px', border: '1px solid #333', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}>
      {timerComponents}
    </div>
  );
};

export default CountdownTimer;
