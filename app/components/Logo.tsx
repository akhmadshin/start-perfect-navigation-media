import { Component } from '@/types/general';

interface Props {
  className?: string;
}

export const Logo: Component<Props> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} height="1rem" viewBox="0 0 20 20" strokeWidth="2"
         stroke="currentColor" fill="transparent" fillOpacity="0.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 1c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9z"/>
      <path d="m4 3 6 14 6-14m-9 7h6"/>
    </svg>
  );
}