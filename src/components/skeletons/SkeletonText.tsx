import React from 'react';
import { Component } from '~/types/general';

interface Props {
  className?: string;
  width?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3';
}

export const SkeletonText: Component<Props> = (
  {
    as = 'span',
    className = '',
    width,
  },
) => {
  const style = {
    width: width ?? 'auto',
    animationFillMode: 'backwards',
    animationDelay: '150ms',
  }
  const skeletonClassName = `${className} bg-zinc-200 dark:bg-zinc-400 animate-pulse`;
  const Tag = as as React.ElementType;
  return <Tag className={skeletonClassName} style={style}>&nbsp;</Tag>;
};
