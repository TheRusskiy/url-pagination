import React from 'react';
import BaseIcon from 'components/icons/BaseIcon';

export const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <BaseIcon className={className} fill="currentColor">
    <path
      clipRule="evenodd"
      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
      fillRule="evenodd"
    />
  </BaseIcon>
);

export default ChevronLeftIcon;
