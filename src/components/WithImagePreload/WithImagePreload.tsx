import { FC, useState, PropsWithChildren } from 'react';
import { ImagePreload } from './ImagePreload';

interface Props {
  size: string;
  src: string;
  height: number;
  width: number;
}
type ParentComponent<T = unknown> = FC<PropsWithChildren<T>>

export const WithImagePreload: ParentComponent<Props> = ({ size, src, height, width, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (size && !isHovered) {
      setIsHovered(true);
    }
  }
  return (
    <div onMouseEnter={handleMouseEnter}>
      {children}
      {isHovered && (
        <ImagePreload
          src={src}
          sizes={size}
          height={height}
          width={width}
        />
      )}
    </div>
  )
}