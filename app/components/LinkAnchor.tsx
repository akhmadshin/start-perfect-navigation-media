import { ParentComponent } from '@/types/general';
import { Link } from '@/components/Link';

interface Props {
  hash: string
}
export const LinkAnchor: ParentComponent<Props> = ({ hash, children }) => {
  return (
    <Link href={`#${hash}`}>
      {children}
    </Link>
  )
}