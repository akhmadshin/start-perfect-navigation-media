const STORAGE_PREFIX = '__VTNH_view_transition';

let currentRouteKey: string | undefined = undefined;
let previousRouteKey: string | undefined = undefined;
let pendingTransitions: Transition[] = [];

interface Transition extends TransitionStorageData {
  toAttributeName: string;
  toAttributeValue: string;
}

interface TransitionStorageData {
  transitionName: string;
  fromSelector: string;
}

function getElementSelector(elm: Element): string {
  if (elm.tagName === "BODY") return "BODY";
  const names: string[] = [];
  while (elm.parentElement && elm.tagName !== "BODY") {
    if (elm.id) {
      names.unshift(`#${elm.id}`);
      break;
    } else {
      let index = 1, sibling = elm;
      while (sibling.previousElementSibling) {
        sibling = sibling.previousElementSibling;
        index++;
      }
      names.unshift(`${elm.tagName}:nth-child(${index})`);
    }
    elm = elm.parentElement;
  }
  return names.join(">");
}

function setTransitionInfo(fromKey: string, toKey: string, value: TransitionStorageData[]): void {
  sessionStorage.setItem(
    `${STORAGE_PREFIX}_${fromKey}_${toKey}_`,
    JSON.stringify(value)
  );
}

function getTransitionInfo(fromKey: string, toKey: string): TransitionStorageData[] {
  const storageKey = `__VTNH_view_transition_${fromKey}_${toKey}_`;
  const storedValue = sessionStorage.getItem(storageKey);
  if (!storedValue) return [];

  try {
    return JSON.parse(storedValue) ?? [];
  } catch (error) {
    console.error('Error parsing transition info:', error);
    return [];
  }
}

function getViewTransitionNameFromSelector(selector: string): string {
  return selector.replace(/[^a-zA-Z0-9]/g, '');
}

function setViewTransitionName(transitionEndElement: HTMLElement, viewTransitionName: string): void {
  cleanUpTransition(viewTransitionName);
  transitionEndElement.style.viewTransitionName = viewTransitionName;
}

function cleanUpTransition(name: string): void {
  const el = document.querySelector<HTMLElement>(`[style*="view-transition-name: ${name}"]`);
  if (el) {
    el.style.viewTransitionName = '';
  }
}


function handleNavigationComplete(): void {
  if (!currentRouteKey || !previousRouteKey) {
    return;
  }
  setTransitionInfo(previousRouteKey, currentRouteKey, pendingTransitions);
  const reverseTransitions = pendingTransitions.map(({ toAttributeName, toAttributeValue, transitionName }) => {
    const transitionElement = document.querySelector<HTMLElement>(`[${toAttributeName}="${toAttributeValue}"]`);
    if (transitionElement) {
      setViewTransitionName(transitionElement, transitionName);
      const selector = getElementSelector(transitionElement);
      return { fromSelector: selector, transitionName };
    }
  }).filter(Boolean) as TransitionStorageData[];

  setTransitionInfo(currentRouteKey, previousRouteKey, reverseTransitions);
  pendingTransitions = [];
}

function handleHistoryNavigationComplete(): void {
  if (!currentRouteKey || !previousRouteKey) {
    return;
  }
  const transitionData = getTransitionInfo(currentRouteKey, previousRouteKey);
  transitionData.forEach(({ transitionName, fromSelector }) => {
    const viewTransitionName = transitionName || getViewTransitionNameFromSelector(fromSelector);
    const element = document.querySelector<HTMLElement>(fromSelector);
    if (element) {
      setViewTransitionName(element, viewTransitionName);
    }
  });
}

export function handleTransitionStarted(currentKey: string, transitions: {
  fromElement?: HTMLElement | null;
  transitionName?: string;
  toAttributeName?: string;
  toAttributeValue: string;
}[]): void {
  currentRouteKey = currentKey;
  pendingTransitions = transitions
    .filter(({ fromElement }) => fromElement)
    .map(({ fromElement, toAttributeName = 'src', toAttributeValue, transitionName = '' }) => {
      const linkSelector = getElementSelector(fromElement!);
      const viewTransitionName = transitionName || getViewTransitionNameFromSelector(linkSelector);
      setViewTransitionName(fromElement!, viewTransitionName);
      return {
        fromSelector: linkSelector,
        transitionName,
        toAttributeName,
        toAttributeValue,
      };
    });
}

export function handleHistoryTransitionStarted(navigatedRouterKey: string): void {
  if (!currentRouteKey) {
    return;
  }
  const data = getTransitionInfo(currentRouteKey, navigatedRouterKey);

  data.forEach(({ transitionName, fromSelector }) => {
    const transitionElement = document.querySelector<HTMLElement>(fromSelector);
    if (transitionElement) {
      setViewTransitionName(transitionElement, transitionName);
    }
  });
}

export function handleRouteChangeComplete(currentRouterKey: string): void {
  const newKey = currentRouterKey;
  previousRouteKey = currentRouteKey;
  currentRouteKey = newKey;

  if (pendingTransitions.length) {
    handleNavigationComplete();
  } else {
    handleHistoryNavigationComplete();
  }
}
