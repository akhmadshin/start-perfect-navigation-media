import { Component } from '@/types/general';


interface Props {
  code: string;
}

export const CodeHighlight: Component<Props> = ({ code }) => {
  return (
    <pre tabIndex={0} className="prism-code language-jsx">
      <code className="language-jsx">
        {code}
      </code>
    </pre>
)
}