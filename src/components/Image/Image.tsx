import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Component } from '~/types/general';
import { createPngDataUri } from './createPngDataUri';
import { NextImage } from '~/components/NextImage/NextImage';
import { ImageProps } from '../NextImage/lib/get-img-props';

// interface ImgProps {
//   // <img>-specific attributes
//   thumbhash?: string;
//   alt?: string;
//   src: string;
//   // srcSet?: string;
//   sizes?: string;
//   // crossOrigin?: "anonymous" | "use-credentials";
//   // decoding?: "sync" | "async" | "auto";
//   height?: number | string;
//   width?: number | string;
//   // loading?: "eager" | "lazy";
//   // referrerPolicy?: string;         // Referrer policy for fetching the image
//   // useMap?: string;                 // Name of a <map> element to associate with the image
//   // isMap?: boolean;                 // Indicates if the image is part of a server-side image map
//   // fetchPriority?: "high" | "low" | "auto"; // Hint for the priority of fetching the image
//
//   className?: string;              // CSS class names (uses className for JS compatibility)
//   title?: string;                  // Advisory title of the image
//
//   // Common event handlers
//   onClick?: (event: MouseEvent) => void;  // Handler for click events
//   onLoad?: (event: Event) => void;        // Handler for when the image loads
//   onError?: (event: Event) => void;       // Handler for when the image fails to load
// }

type Props = Omit<ImageProps, 'alt'> & {
  thumbhash: string;
  alt?: string;
}

export const Image: Component<Props> = ({
  height,
  thumbhash,
  fill,
  width,
  alt,
  title,
  className = '',
  src,
  ...props
}) => {
  const [blurDataURL, setBlurDataURL] = useState<string | undefined>();
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !imgRef.current) {
      return;
    }
    requestIdleCallback(() => {
      if (imgRef.current?.complete) {
        return;
      }
      setBlurDataURL(createPngDataUri(thumbhash));
    });
  }, [thumbhash])

  return (
    <NextImage
      fill={fill}
      src={src}
      key={String(src)}
      className={`bg-no-repeat object-cover rounded-2xl ${className}`}
      draggable={'false'}
      alt={alt ?? ''}
      title={title ?? ''}
      height={fill ? undefined : height}
      width={fill ? undefined : width}
      placeholder={blurDataURL as `data:image/${string}`}
      ref={imgRef}
      {...props}
    />
  );
  // return (
  //   <div style={{ position: 'relative' }}>
  //     <div
  //       className={` object-cover rounded-2xl`}
  //       style={{
  //         backgroundImage: `url(${placeholder})`,
  //         backgroundSize: 'cover',
  //         width: '100%',
  //         height: '100%',
  //         position: 'absolute',
  //         top: 0,
  //         left: 0,
  //         opacity: isLoaded ? 0 : 1,
  //         transition: 'opacity 0.3s',
  //       }}
  //     />
  //     <img
  //       src={src}
  //       sizes={sizes}
  //       onLoad={() => setIsLoaded(true)}
  //       srcSet={srcSet}
  //       key={String(src)}
  //       className={`bg-no-repeat object-cover rounded-2xl ${className}`}
  //       draggable={'false'}
  //       alt={alt ?? ''}
  //       title={title ?? ''}
  //       height={height}
  //       width={width}
  //     />
  //   </div>
  // );
}
