import React from 'react';
import BaseIcon from './BaseIcon';

export const ChevronRightIcon = ({ className }: { className?: string }) => (
  <BaseIcon className={className} fill="currentColor">
    <path
      clipRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      fillRule="evenodd"
    />
  </BaseIcon>
);

export default ChevronRightIcon;
