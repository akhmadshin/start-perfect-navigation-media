import React from 'react';
import { ArticleCard } from '~/components/ArticleCard';
import { Container } from '~/components/Container';
import { Component } from '~/types/general';
import { APIResponseData, ArticleListItem } from '~/types/api';

interface BlogItemCarouselProps {
  articles: APIResponseData<ArticleListItem>[];
}

export const RelatedArticles: Component<BlogItemCarouselProps> = ({ articles }) => {
  return (
    <Container className="mt-12">
      <div className="ml-0 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-12">
        {articles.map((article, index) => (
          <div key={index}>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </Container>
  );
};