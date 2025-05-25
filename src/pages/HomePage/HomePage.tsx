import React from 'react';

import { Container } from '~/components/Container';
import { ArticleList } from '~/components/ArticleList';
import { useHomePageData } from '~/utils/posts/useHomePageData';
import { Meta } from '~/components/Meta';

const title = 'Demo app with fastest navigation possible.';
const description = 'That app demonstrates consistently fast navigation via optimistic UI. Navigation stays responsive regardless of the Internet speed or CPU performance.';

export const HomePage = () => {
  const { data: articles, isLoading, isFetching} = useHomePageData();

  return (
    <>
      <Meta
        title="Posts"
      />
      <Container className="mt-6">
        {/*<Meta*/}
        {/*  title={title}*/}
        {/*  description={description}*/}
        {/*/>*/}
        <div className="prose lg:prose-xl dark:prose-invert max-w-2xl">
          <h1>
            {title}
          </h1>
          <p>
            {description}{' '}
            Click on any card below to see it.
          </p>
        </div>
        <ArticleList articles={articles as any} isLoading={isLoading || isFetching}/>
      </Container>
    </>
  );
}
