import React from 'react';

const BaseIcon = ({
  className,
  fill = 'none',
  children,
}: {
  children: JSX.Element | JSX.Element[];
  className?: string;
  fill?: string;
}) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill={fill}
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);

export default BaseIcon;
