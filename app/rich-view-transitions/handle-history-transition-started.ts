import { cleanUpTransition } from './utils/clean-up-transition';

export const handleHistoryTransitionStarted = (futureKey: string) => {
  const routerKey = window.__NRVT_routerKey!;

  const bffImgSelector = sessionStorage.getItem(`__NRVT_view_transition_image_selector_${routerKey}-${futureKey}`) || '';

  if (bffImgSelector) {
    const clickedImg = document.querySelector<HTMLImageElement>(bffImgSelector);
    if (clickedImg && clickedImg.src) {
      window.__NRVT_transitionAttributeValue = clickedImg.src.replace(location.origin || '', '');
      cleanUpTransition();
      clickedImg.style.viewTransitionName = '__NRVT_transition-img';
    }
  }
}
