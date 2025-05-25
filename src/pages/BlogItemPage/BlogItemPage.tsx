import React from 'react';
import { BlogItemPrePage } from '~/pages/BlogItemPage/BlogItemPrePage';
import { BlogItemPostPage } from '~/pages/BlogItemPage/BlogItemPostPage';

export const BlogItemPage = () => {
  return (
    <div className="mt-6">
      <BlogItemPrePage>
        <BlogItemPostPage />
      </BlogItemPrePage>
    </div>
  )
}
