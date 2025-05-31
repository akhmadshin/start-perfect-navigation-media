import type { JSX } from 'react';
import {
  ImageLoader,
  OnLoadingComplete,
  StaticImport
} from '~/components/NextImage/lib/get-img-props';


const VALID_LOADING_VALUES = ['lazy', 'eager', undefined] as const

type LoadingValue = (typeof VALID_LOADING_VALUES)[number]

type PlaceholderValue = 'blur' | 'empty' | `data:image/${string}`

export type ImageProps = Omit<
  JSX.IntrinsicElements['img'],
  'src' | 'srcSet' | 'ref' | 'alt' | 'width' | 'height' | 'loading'
> & {
  src: string | StaticImport
  alt: string
  width?: number | `${number}`
  height?: number | `${number}`
  fill?: boolean
  loader?: ImageLoader
  quality?: number | `${number}`
  priority?: boolean
  loading?: LoadingValue
  placeholder?: PlaceholderValue
  blurDataURL?: string
  unoptimized?: boolean
  overrideSrc?: string
  /**
   * @deprecated Use `onLoad` instead.
   * @see https://nextjs.org/docs/app/api-reference/components/image#onload
   */
  onLoadingComplete?: OnLoadingComplete
  /**
   * @deprecated Use `fill` prop instead of `layout="fill"` or change import to `next/legacy/image`.
   * @see https://nextjs.org/docs/api-reference/next/legacy/image
   */
  layout?: string
  /**
   * @deprecated Use `style` prop instead.
   */
  objectFit?: string
  /**
   * @deprecated Use `style` prop instead.
   */
  objectPosition?: string
  /**
   * @deprecated This prop does not do anything.
   */
  lazyBoundary?: string
  /**
   * @deprecated This prop does not do anything.
   */
  lazyRoot?: string
}