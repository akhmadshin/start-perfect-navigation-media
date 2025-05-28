import React from 'react';
import { useBlogItemPageData } from '~/utils/posts/useBlogItemPageData';
import { BlogItemPrePage } from './BlogItemPrePage';
import { BlogItemPostPage } from './BlogItemPostPage';
import { BlogItemPrePageLoader } from './BlogItemPrePageLoader';
import { BlogItemPostPageLoader } from './BlogItemPostPageLoader';

export const BlogItemPage = () => {
  const { data: article } = useBlogItemPageData();

  if (!article) {
    return (
      <BlogItemPrePageLoader>
        <BlogItemPostPageLoader />
      </BlogItemPrePageLoader>
    );
  }

  return (
    <BlogItemPrePage article={article}>
      <BlogItemPostPage article={article} />
    </BlogItemPrePage>
  );
};