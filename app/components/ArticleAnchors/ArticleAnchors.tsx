import { Component } from '@/types/general';
import * as React from 'react';
import { Heading } from '@/types/api';
import { cn } from '@/lib/utils';
import { useBlogItemPageData } from '@/utils/posts/useBlogItemPageData';
import { Route } from '@/routes/blog.$postId';
import { Link as TanstackLink } from '@tanstack/react-router';

interface Props {
  headings: Heading[];
}

export const ArticleAnchors: Component<Props> = ({ headings }) => {
  const { isPlaceholderData } = useBlogItemPageData(Route);

  return (
    <nav className="prose prose-slate lg:prose-xl dark:prose-invert max-w-none">
      <h2>Table of contents:</h2>
      <ul>
        {Array.from(headings).map(({title, hash}, index) => (
          <li key={index}>
            <TanstackLink
              viewTransition={false}
              disabled={isPlaceholderData}
              className={cn(isPlaceholderData && 'cursor-wait')}
              hash={hash}
            >
              {title}
            </TanstackLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}