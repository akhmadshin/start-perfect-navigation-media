import React from 'react';
import { useBlogItemPageData } from '~/utils/posts/useBlogItemPageData';
import { ArticlePageFulfilled } from '~/pages/ArticlePage/ArticlePageFulfiled';
import { ArticlePageSkeleton } from '~/pages/ArticlePage/ArticlePageSkeleton';

export const ArticlePage = () => {
  const { data: article, isLoading, isPlaceholderData } = useBlogItemPageData();

  if (isLoading && !article) {
    return (
      <ArticlePageSkeleton />
    );
  }

  if (article) {
    return (
      <ArticlePageFulfilled article={article} isPlaceholderData={isPlaceholderData} />
    )
  }
};
