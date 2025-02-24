// src/components/elements/Button.tsx
import React from 'react';

interface ButtonProps {
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ size = 'medium', onClick, children, type = "button" }) => {
  let className = "";
  if (size === 'large') {
    className = "bg-light-purple px-8 py-4 tracking-wider leading-5 rounded-lg text-lg text-white font-bold";
  } else if (size === 'small') {
    className = "bg-light-purple px-4 py-2 tracking-wider leading-4 rounded-lg text-sm text-white font-bold";
  } else {
    className = "bg-light-purple px-6 py-3 tracking-wider leading-5 rounded-lg text-base text-white font-bold";
  }

  return (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
