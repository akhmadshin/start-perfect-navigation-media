import React from 'react';
import { ArticleCard } from '~/components/ArticleCard';
import { cn } from '~/lib/utils';
import { useBlogItemPageData } from '~/utils/posts/useBlogItemPageData';
import { Container } from '~/components/Container';

export const BlogItemCarousel = () => {
  const { data: article } = useBlogItemPageData();
  const articleAttributes = article?.attributes || undefined;
  const relatedArticles = articleAttributes ? articleAttributes.relatedArticles : undefined;

  return (
    <Container className="mt-12">
      <div className="ml-0 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-12">
        {relatedArticles && relatedArticles.map((article, index) => (
          <div key={index} className={cn(
            '',
          )}>
            <ArticleCard article={article}/>
          </div>
        ))}
      </div>
    </Container>
  )
}
