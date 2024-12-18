import { isTransitionAvailable } from './is-transition-available';
import { getElementSelector } from './get-element-selector';
import { cleanUpTransition } from './clean-up-transition';

export const handleRouteChangeComplete = (routerKey?: string) => {
  if (typeof window === 'undefined') {
    return;
  }
  if (!window.__NRVT_pageMounted) {
    return;
  }


  window.__NRVT_previousRouterKey = window.__NRVT_routerKey;
  window.__NRVT_routerKey = routerKey;

  if (window.__NRVT_routerKeyByHashRouteKey && window.__NRVT_routerKey) {
    routerKey = window.__NRVT_routerKeyByHashRouteKey[window.__NRVT_routerKey] ?? routerKey;
  }

  if (window.__NRVT_transitionImgSelector && window.__NRVT_transitionImgPosition) {
    sessionStorage.setItem(`__NRVT_view_transition_image_selector_${window.__NRVT_previousRouterKey}-${routerKey}`, window.__NRVT_transitionImgSelector);
    sessionStorage.setItem(`__NRVT_view_transition_image_${window.__NRVT_previousRouterKey}-${routerKey}`, window.__NRVT_transitionImgPosition);

    window.__NRVT_transitionImgSelector = undefined;
    window.__NRVT_transitionImgPosition = undefined;
  }
  // Navigation via back-forward
  const backRouterKey = `${routerKey}-${window.__NRVT_previousRouterKey}`;
  const isViewTransitionAvailable = isTransitionAvailable(backRouterKey);

  const imgSelector = sessionStorage.getItem(`__NRVT_view_transition_image_selector_${backRouterKey}`);
  const img = imgSelector ? document.querySelector<HTMLImageElement>(imgSelector) : undefined;

  cleanUpTransition();
  if (img && isViewTransitionAvailable) {
    img.style.viewTransitionName = '__NRVT_transition-img';
  } else {
    // Navigation via clicking link

    const transitionImg = document.querySelector<HTMLImageElement>(`[${window.__NRVT_transitionAttributeName}="${window.__NRVT_transitionAttributeValue}"]`);

    if (transitionImg) {
      const imgSelector = getElementSelector(transitionImg) || '';
      transitionImg.style.viewTransitionName = '__NRVT_transition-img';
      sessionStorage.setItem(`__NRVT_view_transition_image_selector_${backRouterKey}`, imgSelector);
    }
  }

  window.__NRVT_transitionAttributeValue = undefined;
  if (window.__NRVT_pageMounted) {
    window.__NRVT_pageMounted();
    window.__NRVT_pageMounted = undefined;
  }
}
