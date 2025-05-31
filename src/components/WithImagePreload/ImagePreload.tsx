import { generateImgSrc } from './generateImgSrcSet';
import { ImgProps } from '~/components/NextImage/lib/get-img-props';

type PreloadAs =
  | "audio"
  | "document"
  | "embed"
  | "fetch"
  | "font"
  | "image"
  | "object"
  | "track"
  | "script"
  | "style"
  | "video"
  | "worker";

interface PreloadOptions {
  as: PreloadAs;
  crossOrigin?: "anonymous" | "use-credentials" | "" | undefined;
  fetchPriority?: "high" | "low" | "auto" | undefined;
  // TODO: These should only be allowed with `as: 'image'` but it's not trivial to write tests against the full TS support matrix.
  imageSizes?: string | undefined;
  imageSrcSet?: string | undefined;
  integrity?: string | undefined;
  nonce?: string | undefined;
  referrerPolicy?: ReferrerPolicy | undefined;
}

export const ImagePreload = ({
  src,
  width,
  height,
  sizes,
}: {
  src: string;
  sizes: string;
  width: number | `${number}` | undefined;
  height: number | `${number}` | undefined;
}) => {
  const imgAttributes: ImgProps = {
    style: {},
    srcSet: generateImgSrc({
      width: window.innerWidth,
      src,
      sizes: sizes,
    }),
    src,
    alt: '',
    sizes: '100vw',
    loading: 'lazy',
    width: Number(width),
    height: Number(height),
  };
  const opts = {
    as: 'image',
    imageSrcSet: imgAttributes.srcSet,
    imageSizes: imgAttributes.sizes,
    crossOrigin: imgAttributes.crossOrigin,
    referrerPolicy: imgAttributes.referrerPolicy,
  } as PreloadOptions

  return (
    <>
      <link
        key={
          '__nimg-' +
          imgAttributes.src +
          imgAttributes.srcSet +
          imgAttributes.sizes
        }
        rel="preload"
        href={imgAttributes.srcSet ? undefined : imgAttributes.src}
        {...opts}
      />
    </>
  )
}