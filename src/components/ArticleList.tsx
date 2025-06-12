import { ArticleCard } from '~/components/ArticleCard';
import { SkeletonArticleCard } from '~/components/skeletons/SkeletonArticleCard';

import React from 'react';
import { ArticleListApi } from '~/types/api';
import { Component } from '~/types/general';
import { useHomePageData } from '~/utils/posts/useHomePageData';

interface Props {
  articles?: ArticleListApi;
  isLoading?: boolean;
}

export const SkeletonArticleList = () => {
  return (
    <>
      <SkeletonArticleCard/>
      <SkeletonArticleCard/>
      <SkeletonArticleCard/>
      <SkeletonArticleCard/>
      <SkeletonArticleCard/>
      <SkeletonArticleCard/>
      <SkeletonArticleCard/>
      <SkeletonArticleCard/>
      <SkeletonArticleCard/>
      <SkeletonArticleCard/>
    </>
  )
};

const ArticleListContent: Component<Props> = ({ articles, isLoading }) => {
  if (!articles && isLoading) {
    return <SkeletonArticleList />
  }

  if (!articles?.data) {
    return;
  }

  return (
    <>
      {articles.data.map((article, index) => (
        <ArticleCard article={article} key={index} priority={index === 0} />
      ))}
    </>
  )
}

export const ArticleList: Component = () => {
  const { data: articles, isLoading, isFetching} = useHomePageData();

  return (
    <div className="mt-16">
      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12">
        <ArticleListContent articles={articles} isLoading={isLoading} />
      </div>
    </div>
  )
}