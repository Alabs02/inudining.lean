import React, { useRef, useState, useEffect } from 'react';

const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateCursorPosition);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
    };
  }, []);

  const dotStyles = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    willChange: "auto",
  };

  const outlineStyles = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    willChange: "auto",
  };

  return (
    <>
      <div ref={dotRef} style={dotStyles} className="cursor-dot"></div>
      <div ref={outlineRef} style={outlineStyles} className="cursor-outline"></div>
    </>
  );
};

export { Cursor };
