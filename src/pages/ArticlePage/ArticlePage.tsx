import React from 'react';
import { useBlogItemPageData } from '~/utils/posts/useBlogItemPageData';
import { ArticlePageFulfilled } from '~/pages/ArticlePage/ArticlePageFulfiled';
import { ArticlePageSkeleton } from '~/pages/ArticlePage/ArticlePageSkeleton';

export const ArticlePage = () => {
  const { data: article, isLoading, isPlaceholderData } = useBlogItemPageData();

  if (!article && isLoading) {
    return (
      <ArticlePageSkeleton />
    );
  }

  if (!article) {
    return null;
  }

  return (
    <ArticlePageFulfilled article={article} isPlaceholderData={isPlaceholderData} />
  )
};
