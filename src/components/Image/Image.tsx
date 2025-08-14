import React, { useEffect, useRef, useState } from 'react';
import { Component } from '~/types/general';
import { createPngDataUri } from './createPngDataUri';
import { NextImage } from '~/components/NextImage/NextImage';
import { ImageProps } from '../NextImage/lib/get-img-props';
import {requestIdleCallback} from "~/lib/request-idle-callback";

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
}
