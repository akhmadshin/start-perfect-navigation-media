import React from 'react';
import { Container } from '~/components/Container';
import { Image } from '~/components/Image';
import { RichText } from '~/components/RichText';
import { ParentComponent } from '~/types/general';
import { APIResponseData, ArticleItem, ArticleItemApi, ArticleListItem } from '~/types/api';
import { ArticleAnchors } from '~/components/ArticleAnchors';
import { Meta } from '~/components/Meta';

interface BlogItemPrePageProps {
  article: APIResponseData<ArticleListItem | ArticleItem>;
}

export const BlogItemPrePage: ParentComponent<BlogItemPrePageProps> = ({ article, children }) => {
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
            <div>
              <Image
                className="aspect-[16/9] transition-img transitionable-img"
                src={`/uploads/${coverAttributes.name}`}
                alt={coverAttributes.alternativeText || ''}
                width={coverAttributes.width}
                height={coverAttributes.height}
              />
            </div>
            <div className="prose lg:prose-xl dark:prose-invert max-w-none mt-14">
              <h1>{title}</h1>
            </div>
            <div className="text-xl mt-10">
              <RichText content={description} />
            </div>
          </div>
        </Container>
        <div className="my-12" />
        <Container>
          <ArticleAnchors headings={headings} />
          <RichText content={previewContent} />
        </Container>
        <div className="flex flex-col space-y-6">
          {children}
        </div>
      </article>
    </>
  );
};