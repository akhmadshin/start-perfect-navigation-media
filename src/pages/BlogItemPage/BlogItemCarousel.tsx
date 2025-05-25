import React from 'react';
import { ArticleCard } from '~/components/ArticleCard';
import { Container } from '~/components/Container';
import { Component } from '~/types/general';
import { ArticleItemApi } from '~/types/api';

interface BlogItemCarouselProps {
  article: ArticleItemApi;
}

export const BlogItemCarousel: Component<BlogItemCarouselProps> = ({ article }) => {
  const articleAttributes = article.attributes || {};
  const relatedArticles = articleAttributes.relatedArticles;

  return (
    <Container className="mt-12">
      <div className="ml-0 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-12">
        {relatedArticles?.map((article, index) => (
          <div key={index}>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </Container>
  );
};