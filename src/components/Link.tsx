import React, { PropsWithChildren } from 'react';
import { Link as TanstackLink, LinkProps, useRouterState } from '@tanstack/react-router';
import { setPlaceholderData } from '~/singletones/placeholderData';
import { handleTransitionStarted } from 'view-transition-name-handler';

type Props = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  placeholderData?: object;
}

export const Link: React.FC<PropsWithChildren<Props>> = ({ children, onClick, placeholderData, hash, ...props }) => {
  const router = useRouterState();

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    setPlaceholderData(placeholderData);

    // Find an image that should start transitioning. Feel free to change that code.
    const transitionImg = e.currentTarget.querySelector<HTMLImageElement>('.transitionable-img') || document.querySelector('#transition-img');
    const src = transitionImg ? transitionImg.src.replace(location.origin || '', '') : '';

    handleTransitionStarted(router.location.state.key ?? 'initial', [{
      fromElement: transitionImg,
      toAttributeName: 'src',
      toAttributeValue: src,
      transitionName: 'transition-name'
    }]);
  }

  return (
    <TanstackLink
      viewTransition={true}
      onClick={handleClick}
      hash={hash}
      {...props}
    >
      {children}
    </TanstackLink>
  )
}