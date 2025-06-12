import React from 'react';
import { Meta } from '~/components/Meta';
import { Container } from '~/components/Container';
import { Image } from '~/components/Image';
import { RichText } from '~/components/RichText';
import { ArticleAnchors } from '~/components/ArticleAnchors';
import { ArticleContent } from './ArticleContent';
import { APIResponseData, ArticleItem, ArticleListItem } from '~/types/api';
import { Component } from '~/types/general';
import { Counter } from '~/pages/ArticlePage/Counter';

interface Props {
  article: APIResponseData<ArticleListItem | ArticleItem>;
  isFallback: boolean;
}

export const ArticlePageFulfilled: Component<Props> = ({ article, isFallback }) => {
  const articleAttributes = article.attributes || {};
  const coverAttributes = articleAttributes.thumbnail.data!.attributes || {};
  const { title, description, headings, previewContent, slug } = articleAttributes;
  let seo;
  if ('seo' in articleAttributes) {
    seo = articleAttributes.seo;
  }

  return (
    <>
      {seo && (
        <Meta
          isArticle
          title={seo.title}
          description={seo.description}
          canonical={`/blog/${slug}/`}
          type="article"
          image={coverAttributes}
        />
      )}
      <article className="flex flex-col dark:text-gray-50">
        <Container>
          <div className="flex flex-col">
            <Image
              thumbhash={coverAttributes.thumbhash}
              className="aspect-[16/9] transition-img transitionable-img"
              src={`/uploads/${coverAttributes.name}`}
              alt={coverAttributes.alternativeText || ''}
              width={coverAttributes.width}
              height={coverAttributes.height}
              sizes="100vw"
            />
            <div className="prose lg:prose-xl dark:prose-invert max-w-none mt-14">
              <h1>{title}</h1>
            </div>
            <div className="text-xl mt-10">
              <RichText content={description} />
            </div>
            <Counter key={slug} />
          </div>
        </Container>
        <div className="my-12" />
        <Container>
          <ArticleAnchors headings={headings} isPlaceholderData={isFallback} />
          <RichText content={previewContent} />
        </Container>
        <div className="flex flex-col space-y-6">
          <ArticleContent article={article} />
        </div>
      </article>
    </>
  );
}