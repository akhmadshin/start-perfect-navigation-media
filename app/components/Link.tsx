import React, { PropsWithChildren } from 'react';
import { Link as TanstackLink, LinkProps } from '@tanstack/react-router';

type Props = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  placeholderData?: object;
}
export const Link: React.FC<PropsWithChildren<Props>> = ({ children, onClick, placeholderData, ...props }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    window.placeholderData = placeholderData;
  }
  return (
    <TanstackLink
      onClick={handleClick}
      {...props}
    >
      {children}
    </TanstackLink>
  )
}