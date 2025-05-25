import React from 'react';
import { Component } from '~/types/general';

interface ImgProps {
  // <img>-specific attributes
  alt?: string;
  src: string;
  // srcSet?: string;
  // sizes?: string;
  // crossOrigin?: "anonymous" | "use-credentials";
  // decoding?: "sync" | "async" | "auto";
  height?: number | string;
  width?: number | string;
  // loading?: "eager" | "lazy";
  // referrerPolicy?: string;         // Referrer policy for fetching the image
  // useMap?: string;                 // Name of a <map> element to associate with the image
  // isMap?: boolean;                 // Indicates if the image is part of a server-side image map
  // fetchPriority?: "high" | "low" | "auto"; // Hint for the priority of fetching the image

  className?: string;              // CSS class names (uses className for JS compatibility)
  title?: string;                  // Advisory title of the image

  // Common event handlers
  onClick?: (event: MouseEvent) => void;  // Handler for click events
  onLoad?: (event: Event) => void;        // Handler for when the image loads
  onError?: (event: Event) => void;       // Handler for when the image fails to load
}
export const Image: Component<ImgProps> = ({
  height,
  width,
  alt,
  title,
  className = '',
  src,
}) => {

  return (
    <img
      src={src}
      key={String(src)}
      className={`bg-no-repeat object-cover rounded-2xl ${className}`}
      draggable={'false'}
      alt={alt ?? ''}
      title={title ?? ''}
      height={height}
      width={width}
    />
  )
}
