// src/components/GalaxyBackground.jsx
import React from 'react';

function GalaxyBackground() {
  // Create 100 stars with random positions and sizes
  const stars = Array.from({ length: 100 }).map((_, index) => {
    const sizeClass = ['small', 'medium', 'large'][Math.floor(Math.random() * 3)];
    const top = Math.random() * 100;   // vh
    const left = Math.random() * 100;  // vw
    return (
      <div
        key={`star-${index}`}
        className={`star ${sizeClass}`}
        style={{ top: `${top}vh`, left: `${left}vw` }}
      />
    );
  });

  return (
    <>
      {stars}
      <div className="planet small" />
      <div className="planet medium" />
      <div className="planet large" />
      <div className="nebula" />
    </>
  );
}

export default GalaxyBackground;
