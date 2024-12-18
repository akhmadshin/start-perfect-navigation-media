import { Component } from '@/types/general';
import { Sections } from '@/components/SectionsRenderer/SectionsRenderer';
import { HeadingBlockNode } from './ArticleAnchor';
import * as React from 'react';
import { stringToHash } from '@/lib/string-to-hash';
import { getHeadingsFromSections } from '@/lib/get-headings';
import { LinkAnchor } from '@/components/LinkAnchor';

interface Props {
  sections: Sections
}

export const ArticleAnchorsListRenderer: Component<Props> = ({ sections }) => {
  const headings = getHeadingsFromSections(sections);

  if (!sections) {
    return null;
  }

  return (
    <>
      <nav className="prose prose-slate lg:prose-xl dark:prose-invert max-w-none">
        <h2>Table of contents:</h2>
        <ul>
          {Array.from(headings).map((headingBlock, index) => (
            <ArticleAnchor headingBlock={headingBlock} key={index} />
          ))}
        </ul>
      </nav>
    </>

  )

}

interface ArticleAnchorProps {
  headingBlock: HeadingBlockNode
}
const ArticleAnchor: Component<ArticleAnchorProps> =  ({ headingBlock }) => {
  const headerText = (headingBlock.children as any)!
    .filter((m: any) => m?.text)
    .map((m: any) => m.text)
    .join();

  const hash = stringToHash(headerText);
  return (
    <li>
      <LinkAnchor hash={hash}>{headerText}</LinkAnchor>
    </li>
  )
}