import React, { useRef } from 'react';
import { Container } from '@/components/Container';
import { Image } from '@/components/image';
import { RichText } from '@/components/RichText';
import { SkeletonBlogItemPage } from '@/pages/BlogItemPage/SkeletonBlogItemPage';
import { ParentComponent } from '@/types/general';
import { BlogItemPostPageLoader } from './BlogItemPostPageLoader';
import { useBlogItemPageData } from '@/utils/posts/useBlogItemPageData';
import { Separator } from '@/components/ui/separator';
import { ArticleAnchors } from '@/components/ArticleAnchors/ArticleAnchors';

export const BlogItemPrePage: ParentComponent = ({ children }) => {
  const { data: article, isLoading, isFetching } = useBlogItemPageData();
  const imgContainerRef = useRef<HTMLDivElement>(null);

  if (!article && (isLoading || isFetching)) {
    return (
      <SkeletonBlogItemPage>
        <BlogItemPostPageLoader />
        {children}
      </SkeletonBlogItemPage>
    );
  }
  if (!article || !article.attributes) {
    return children;
  }

  const articleAttributes = article.attributes || {};
  const coverAttributes = articleAttributes.thumbnail.data!.attributes || {};
  const {title, description, headings, previewContent } = articleAttributes;

  return (
    <>
      {/*<Meta*/}
      {/*  isArticle*/}
      {/*  title={seo?.metaTitle}*/}
      {/*  description={seo?.metaDescription}*/}
      {/*  canonical={`/blog/${slug}/`}*/}
      {/*  type="article"*/}
      {/*  image={coverAttributes}*/}
      {/*/>*/}
      <article className="flex flex-col dark:text-gray-50">
        <Container>
          <div className="flex flex-col ">
            <div ref={imgContainerRef}>
              <Image
                className="aspect-[16/9] transition-img transitionable-img"
                priority
                sizes="100vw"
                src={`/uploads/${coverAttributes.name}`}
                thumbhash={coverAttributes.thumbhash}
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
        <Separator className="my-16" />
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
