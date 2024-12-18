import React, { PropsWithChildren } from 'react';
import { Link as TanstackLink, LinkProps, useRouter } from '@tanstack/react-router';
import { startViewTransition } from '@/rich-view-transitions';

type Props = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  placeholderData?: object;
}
export const Link: React.FC<PropsWithChildren<Props>> = ({ children, onClick, placeholderData, ...props }) => {
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // e.preventDefault();

    if (onClick) {
      onClick(e);
    }
    window.placeholderData = placeholderData;

    // Find an image that should start transitioning. Feel free to change that code.
    const transitionImg = e.currentTarget.querySelector<HTMLImageElement>('.transitionable-img') || document.querySelector('#transition-img');
    const src = transitionImg ? transitionImg.src.replace(location.origin || '', '') : '';
    await startViewTransition({
      element: transitionImg,
      attributeName: 'src',
      attributeValue: src,
    })
    router.navigate({ href: props.href });
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