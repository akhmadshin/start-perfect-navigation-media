import { LazyLoadImageProps } from 'react-lazy-load-image-component';

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { createPngDataUri } from './createPngDataUri';
import { requestIdleCallback } from '~/lib/request-idle-callback'

type Props = LazyLoadImageProps & {
  thumbhash: string;
  priority?: boolean;
  alt?: string;
}

export const Image = forwardRef<HTMLImageElement, Props>(({
  thumbhash,
  priority,
  height,
  width,
  alt,
  title,
  className = '',
  src,
  children,
  ...props
}, ref) => {
  const [blurDataURL, setBlurDataURL] = useState<string | undefined>();
  const imgRef = useRef<HTMLImageElement>();

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
    <img
      src={src}
      key={String(src)}
      className={`bg-no-repeat object-cover rounded-2xl ${className}`}
      draggable={'false'}
      alt={alt ?? ''}
      title={title ?? ''}
      height={height}
      width={width}
      // placeholderSrc={blurDataURL as `data:image/${string}`}
      {...props}
    />
  )
})

Image.displayName = 'Image';