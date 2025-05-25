import React, { useRef } from 'react';

import { Link } from '~/components/Link';
import { SkeletonArticleCard } from '~/components/skeletons/SkeletonArticleCard';
import { Image } from '~/components/Image';
import { RichText } from '~/components/RichText';
import { APIResponseData, ApiResponseMedia, ArticleListItem } from '~/types/api';

interface Props {
  article: APIResponseData<ArticleListItem>;
}

export const ArticleCard: React.FC<Props> = ({ article }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  if (!article) {
    return <SkeletonArticleCard/>
  }

  const articleAttributes = article.attributes;
  const coverAttributes = (articleAttributes.thumbnail as ApiResponseMedia).data.attributes;

  return (
    <div ref={containerRef}>
      <Link
        to={"/blog/$postId"}
        params={{ postId: articleAttributes.slug }}
        placeholderData={article}
      >
        <article className="flex flex-col items-start justify-between">
          <div
            className="relative w-full"
          >
            <Image
              className="aspect-[16/9] transitionable-img"
              src={`/uploads/${coverAttributes.name}`}
              alt={coverAttributes.alternativeText || ''}
              width={coverAttributes.width}
              height={coverAttributes.height}
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"/>
          </div>
          <h3 className="mt-4 text-2xl font-bold line-clamp-2 4xl:text-regular-18 group-hover:text-gray-600">
            {articleAttributes.title}
          </h3>
          <div className="relative z-10 mt-3 line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-200">
            <RichText content={articleAttributes.description} className="prose"/>
          </div>
        </article>
      </Link>

    </div>
  )
}