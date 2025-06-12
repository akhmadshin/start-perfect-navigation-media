import React from 'react';
import { ArticlePageSkeleton } from './ArticlePageSkeleton';
import { APIResponseData, ArticleListItem } from '~/types/api';
import { getPlaceholderData } from '~/singletones/placeholderData';
import { ArticlePageFulfilled } from '~/pages/ArticlePage/ArticlePageFulfiled';

export const ArticlePageFallback = () => {
  const placeholderData = getPlaceholderData() as APIResponseData<ArticleListItem>;

  if (!placeholderData) {
    return (
      <ArticlePageSkeleton />
    );
  }
  return <ArticlePageFulfilled article={placeholderData} isFallback />
};