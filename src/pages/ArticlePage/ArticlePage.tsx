import React from 'react';
import { useBlogItemPageData } from '~/utils/posts/useBlogItemPageData';
import { ArticlePageFulfilled } from '~/pages/ArticlePage/ArticlePageFulfiled';

export const ArticlePage = () => {
  const { data: article } = useBlogItemPageData();

  return (
    <ArticlePageFulfilled article={article} isFallback={false} />
  )
};
