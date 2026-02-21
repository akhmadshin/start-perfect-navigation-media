import { useState } from 'react';
import { ImagePreload } from './ImagePreload';
import { ParentComponent } from '~/types/general';

interface Props {
  size: string;
  src: string;
  height: number;
  width: number;
}

export const WithImagePreload: ParentComponent<Props> = ({ size, src, height, width, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (!isHovered) {
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