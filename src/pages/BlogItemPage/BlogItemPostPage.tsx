import React, { useEffect, useRef } from 'react';
import { ArticleItemApi } from '~/types/api';
import { requestIdleCallback } from '~/lib/request-idle-callback';
import { BlogItemPostPageLoader } from '~/pages/BlogItemPage/BlogItemPostPageLoader';
import { cn } from '~/lib/utils';
import { useBlogItemPageData } from '~/utils/posts/useBlogItemPageData';
import { BlogItemCarousel } from '~/pages/BlogItemPage/BlogItemCarousel';
import { Container } from '~/components/Container';
import { RichText } from '~/components/RichText';

export const BlogItemPostPage = () => {
  const { data: article, isLoading, isFetching } = useBlogItemPageData();

  if (isLoading || isFetching) {
    return <BlogItemPostPageLoader />;
  }

  if (!article) {
    return null;
  }

  return (
    <BlogItemContent article={article}/>
  )
}

const BlogItemContent = ({ article }: { article: ArticleItemApi }) => {
  const articleAttributes = article.attributes || {};
  const { content } = articleAttributes;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!article || !ref.current) {
      return;
    }
    requestIdleCallback(() => {
      if (!ref.current) {
        return;
      }
      ref.current.style.opacity = '1';
    });
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-opacity ease-in duration-300 opacity-0',
      )}
    >
      <BlogItemCarousel />
      <Container>
        <RichText content={content}/>
      </Container>
    </div>
  )
}
