import React, { useRef } from 'react';
import { Container } from '~/components/Container';
import { Image } from '~/components/image';
import { RichText } from '~/components/RichText';
import { ParentComponent } from '~/types/general';
import { useBlogItemPageData } from '~/utils/posts/useBlogItemPageData';
import { ArticleAnchors } from '~/components/ArticleAnchors';
import { Meta } from '~/components/Meta';

import { BlogItemPrePageLoader } from './BlogItemPrePageLoader';
import { BlogItemPostPageLoader } from './BlogItemPostPageLoader';

export const BlogItemPrePage: ParentComponent = ({ children }) => {
  const { data: article, isLoading, isFetching } = useBlogItemPageData();
  const imgContainerRef = useRef<HTMLDivElement>(null);

  if (!article && (isLoading || isFetching)) {
    return (
      <BlogItemPrePageLoader>
        <BlogItemPostPageLoader />
        {children}
      </BlogItemPrePageLoader>
    );
  }
  if (!article || !article.attributes) {
    return children;
  }

  const articleAttributes = article.attributes || {};
  const coverAttributes = articleAttributes.thumbnail.data!.attributes || {};
  const {title, description, headings, previewContent, slug, seo } = articleAttributes;

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
          <div className="flex flex-col ">
            <div ref={imgContainerRef}>
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
              <RichText content={description}/>
            </div>
          </div>
        </Container>
        <div className="my-16" />
        <Container>
          <ArticleAnchors headings={headings} />
          <RichText content={previewContent}/>
        </Container>
        <div className="flex flex-col space-y-6">
          {children}
        </div>
      </article>
    </>
  )
}
