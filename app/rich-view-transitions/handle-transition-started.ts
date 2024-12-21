import { getElementSelector } from './utils/get-element-selector';

export interface StartViewTransitionProps {
  element?: HTMLElement | null;
  attributeName?: string;
  attributeValue: string;
}

export const handleTransitionStarted = ({ element, attributeName, attributeValue }: StartViewTransitionProps) => {
  if (element) {
    const linkSelector = getElementSelector(element);

    window.__NRVT_transitionImgSelector = linkSelector;
    window.__NRVT_transitionAttributeValue = attributeValue;
    window.__NRVT_transitionAttributeName = attributeName;

    const el = document.querySelector<HTMLImageElement>(`[style*='view-transition-name']`);
    if (el) {
      el.style.viewTransitionName = '';
    }
    element.style.viewTransitionName = '__NRVT_transition-img';
  }
}
