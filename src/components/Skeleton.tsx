import React from 'react';
import { cn } from '../lib/utils';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div className={cn(
      "animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg",
      className
    )} />
  );
};

export default Skeleton;
