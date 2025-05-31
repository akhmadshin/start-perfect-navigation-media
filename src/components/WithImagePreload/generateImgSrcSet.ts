import { defaultLoader, ImageConfigComplete, imageConfigDefault } from '~/components/NextImage/lib/image-config';

const getWidths = ({ deviceSizes, imageSizes }: ImageConfigComplete,
  width: number | undefined,
  sizes: string | undefined
): { widths: number[]; kind: 'w' | 'x' } => {
  const allSizes = [...deviceSizes, ...imageSizes].sort((a, b) => a - b)

  if (sizes) {
    // Find all the "vw" percent sizes used in the sizes prop
    const viewportWidthRe = /(^|\s)(1?\d?\d)vw/g
    const percentSizes: number[] = []
    for (let match: RegExpExecArray | null; (match = viewportWidthRe.exec(sizes)); match) {
      if (match) {
        percentSizes.push(parseInt(match[2]))
      }
    }
    if (percentSizes.length) {
      const smallestRatio = Math.min(...percentSizes) * 0.01
      return { widths: allSizes.filter((s) => s >= deviceSizes[0] * smallestRatio), kind: 'w' }
    }
    return { widths: allSizes, kind: 'w' }
  }
  if (typeof width !== 'number') {
    return { widths: deviceSizes, kind: 'w' }
  }

  const widths = [...Array.from(new Set([
    width, width * 2 /*, width * 3*/
  ]
    .map((w) => allSizes
      .find((p) => p >= w) ?? allSizes[allSizes.length - 1]))),]
  return { widths, kind: 'x' }
}

export const generateImgSrc = ({
  src,
  width,
  sizes,
}: { src: string; width: number; sizes: string }): string => {
  // @ts-ignore
  const { widths, kind } = getWidths(imageConfigDefault, width, sizes)
  return widths
    .map(
      (w, i) =>
        `${defaultLoader({ src, width: w })} ${
          kind === 'w' ? w : i + 1
        }${kind}`
    )
    .join(', ')
}