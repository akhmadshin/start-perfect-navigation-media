import React, { useEffect, useRef } from 'react';
import { APIResponseData, ArticleItem, ArticleListItem } from '~/types/api';
import { Container } from '~/components/Container';
import { RichText } from '~/components/RichText';
import { Component } from '~/types/general';
import { ArticlePageContentSkeleton } from './ArticlePageContentSkeleton';
import type { BlocksContent } from '@strapi/blocks-react-renderer';

interface Props {
  article: APIResponseData<ArticleListItem | ArticleItem>;
}

export const ArticlePageContent: Component<Props> = ({ article }) => {
  const articleAttributes = article.attributes || {};
  let content: BlocksContent | undefined;
  if ('content' in articleAttributes) {
    content = articleAttributes.content;
  }

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (!content || !ref.current) {
        return;
      }
      ref.current.style.opacity = '1';
    });
  }, [content]);

  if (!content) {
    return (
      <ArticlePageContentSkeleton />
    );
  }

  return (
    <div
      ref={ref}
      className={"transition-opacity ease-linear duration-700 opacity-0"}
    >
      <Container>
        <RichText content={content} />
      </Container>
    </div>
  );
};
