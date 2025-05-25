import React, { useEffect, useRef } from 'react';
import { ArticleItemApi } from '~/types/api';
import { BlogItemCarousel } from './BlogItemCarousel';
import { Container } from '~/components/Container';
import { RichText } from '~/components/RichText';
import { Component } from '~/types/general';
import { BlogItemPostPageLoader } from '~/pages/BlogItemPage/BlogItemPostPageLoader';

interface BlogItemPostPageProps {
  article: ArticleItemApi;
}

export const BlogItemPostPage: Component<BlogItemPostPageProps> = ({ article }) => {
  const articleAttributes = article.attributes || {};
  const { content } = articleAttributes;
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
      <BlogItemPostPageLoader />
    );
  }

  return (
    <div
      ref={ref}
      className={"transition-opacity ease-linear duration-700 opacity-0"}
    >
      <BlogItemCarousel article={article} />
      <Container>
        <RichText content={content} />
      </Container>
    </div>
  );
};
