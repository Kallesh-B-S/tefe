"use client";

import { useRouter } from 'next/navigation'; // Use this for App Directory
import React from 'react';

// Define the props interface
interface RouteButtonType {
  route: string; // The route to navigate to
  name: string; // The name to display on the button
  className?: string; // Optional className prop
}

const RouteButton: React.FC<RouteButtonType> = ({ route, name, className }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(route);
  };

  return (
    <button onClick={handleClick} className={className}>
      {name}
    </button>
  );
};

export default RouteButton;