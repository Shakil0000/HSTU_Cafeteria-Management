import React from 'react';

const Notice = () => {
  return (
    <div style={{
      height: '40px',
      width: '100%',
      padding: '10px 0',
      backgroundColor: 'black',
      color: 'white',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{
        display: 'inline-block',
        whiteSpace: 'nowrap',
        position: 'absolute',
        animation: 'marquee 20s linear infinite',
      }}>
        ▶️NOTICE!   This is a 30-word notice moving from right to left. You can replace this text with any message you'd like. The text will scroll continuously across the screen.
      </div>
      <style>
        {`
          @keyframes marquee {
            from { right: -100%; }
            to { right: 100%; }
          }
        `}
      </style>
    </div>
  );
};

export default Notice;
