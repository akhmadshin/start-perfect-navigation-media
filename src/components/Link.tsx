import React, { PropsWithChildren } from 'react';
import { Link as TanstackLink, LinkProps, useRouter, useRouterState } from '@tanstack/react-router';
import { setPlaceholderData } from '~/singletones/placeholderData';
import { handleTransitionStarted } from '~/view-transition-name-handler';

type Props = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  placeholderData?: object;
}
export const Link: React.FC<PropsWithChildren<Props>> = ({ children, onClick, placeholderData, hash, ...props }) => {
  const router = useRouterState();

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    console.log('hash = ', hash);


    if (typeof hash === 'string') {
      e.preventDefault();
      const targetElement = document.getElementById(hash);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      return;
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
      {...props}
    >
      {children}
    </TanstackLink>
  )
}