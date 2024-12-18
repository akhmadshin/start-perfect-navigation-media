import React, { PropsWithChildren } from 'react';
import { Link as TanstackLink, LinkProps } from '@tanstack/react-router';
import { getElementSelector } from '@/rich-view-transitions/utils/get-element-selector';

type Props = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  placeholderData?: object;
}
export const Link: React.FC<PropsWithChildren<Props>> = ({ children, onClick, placeholderData, ...props }) => {
  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // e.preventDefault();

    if (onClick) {
      onClick(e);
    }
    window.placeholderData = placeholderData;

    // Find an image that should start transitioning. Feel free to change that code.
    const transitionImg = e.currentTarget.querySelector<HTMLImageElement>('.transitionable-img') || document.querySelector('#transition-img');
    const src = transitionImg ? transitionImg.src.replace(location.origin || '', '') : '';

    if (transitionImg) {
      const linkSelector = getElementSelector(transitionImg);

      window.__NRVT_transitionImgSelector = linkSelector;
      window.__NRVT_transitionAttributeValue = src;
      window.__NRVT_transitionAttributeName = 'src';

      const el = document.querySelector<HTMLImageElement>(`[style*='view-transition-name']`);
      if (el) {
        el.style.viewTransitionName = '';
      }
      transitionImg.style.viewTransitionName = '__NRVT_transition-img';
    }
  }

  return (
    <TanstackLink
      viewTransition={true}
      onClick={handleClick}
      {...props}
    >
      {children}
    </TanstackLink>
  )
}