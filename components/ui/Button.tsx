'use client';

import React from 'react';
import LoadingSpinner from './LoadingSpinner';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outline';
  color?: 'sky' | 'sun' | 'grass' | 'heart' | 'night';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const colorStyles = {
  sky: {
    filled: 'bg-[#5DBFDB] text-white border-[#5DBFDB] hover:bg-transparent hover:text-[#5DBFDB]',
    outline: 'bg-transparent text-[#5DBFDB] border-[#5DBFDB] hover:bg-[#5DBFDB] hover:text-white'
  },
  sun: {
    filled: 'bg-[#F4C950] text-white border-[#F4C950] hover:bg-transparent hover:text-[#F4C950]',
    outline: 'bg-transparent text-[#F4C950] border-[#F4C950] hover:bg-[#F4C950] hover:text-white'
  },
  grass: {
    filled: 'bg-[#91C733] text-white border-[#91C733] hover:bg-transparent hover:text-[#91C733]',
    outline: 'bg-transparent text-[#91C733] border-[#91C733] hover:bg-[#91C733] hover:text-white'
  },
  heart: {
    filled: 'bg-[#E53935] text-white border-[#E53935] hover:bg-transparent hover:text-[#E53935]',
    outline: 'bg-transparent text-[#E53935] border-[#E53935] hover:bg-[#E53935] hover:text-white'
  },
  night: {
    filled: 'bg-[#1E293B] text-white border-[#1E293B] hover:bg-transparent hover:text-[#1E293B]',
    outline: 'bg-transparent text-[#1E293B] border-[#1E293B] hover:bg-[#1E293B] hover:text-white'
  }
};

const sizeStyles = {
  sm: 'px-3 py-2 text-sm font-medium min-h-[40px]',
  md: 'px-4 py-3 text-base font-medium min-h-[44px]',
  lg: 'px-6 py-4 text-lg font-semibold min-h-[48px]'
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'filled',
  color = 'sky',
  size = 'md',
  children,
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles = `
    relative
    inline-flex
    items-center
    justify-center
    gap-2
    font-sans
    text-[16px]
    rounded-lg
    border-2
    transition-all
    duration-300
    ease-in-out
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    focus:ring-opacity-50
    active:scale-[0.98]
    select-none
    touch-manipulation
  `;

  const colorClass = colorStyles[color][variant];
  const sizeClass = sizeStyles[size];
  const widthClass = fullWidth ? 'w-full' : '';
  
  const disabledStyles = disabled || loading ? 
    'opacity-50 cursor-not-allowed hover:transform-none active:scale-100' : 
    'cursor-pointer';

  const focusRingColor = {
    sky: 'focus:ring-[#5DBFDB]',
    sun: 'focus:ring-[#F4C950]',
    grass: 'focus:ring-[#91C733]',
    heart: 'focus:ring-[#E53935]',
    night: 'focus:ring-[#1E293B]'
  }[color];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    onClick?.(e);
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${colorClass}
        ${sizeClass}
        ${widthClass}
        ${disabledStyles}
        ${focusRingColor}
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="sm" color="currentColor" />
        </div>
      )}
      
      <span className={`flex items-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {leftIcon && (
          <span className="flex-shrink-0">
            {leftIcon}
          </span>
        )}
        
        <span className="flex-1 text-center">
          {children}
        </span>
        
        {rightIcon && (
          <span className="flex-shrink-0">
            {rightIcon}
          </span>
        )}
      </span>
    </button>
  );
};

export default Button;