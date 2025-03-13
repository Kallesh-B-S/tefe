"use client";

// import { useRouter } from 'next/navigation'; // Use this for App Directory
import React from 'react';

// Define the props interface
interface RouteButtonType {
  // route: string; // The route to navigate to
  name: string; // The name to display on the button
  className?: string; // Optional className prop
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void; // Updated onClick prop type
}

const RouteButton: React.FC<RouteButtonType> = ({  name, className, onClick }) => {
  // const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e); // Call the custom onClick function if provided
    }
    // router.push(route); // Navigate to the specified route
  };

  return (
    <button onClick={handleClick} className={className}>
      {name}
    </button>
  );
};

export default RouteButton;