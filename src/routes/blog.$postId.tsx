import { ErrorComponent, createFileRoute } from '@tanstack/react-router'
import { NotFound } from '~/components/NotFound'
import React, { Suspense } from 'react'
import { ArticlePage } from 'src/pages/ArticlePage';
import { blogItemPageOptions } from '~/utils/posts/useBlogItemPageData';
import { ArticlePageFallback } from '~/pages/ArticlePage/ArticlePageFallback';

const NotFoundRouteComponent = () => <NotFound>Post not found</NotFound>

export const Route = createFileRoute('/blog/$postId')({
  loader: ({ params: { postId }, context }) => {
    context.queryClient.ensureQueryData(
      blogItemPageOptions(postId),
    )
  },
  errorComponent: ErrorComponent,
  notFoundComponent: NotFoundRouteComponent,
  component: PostComponent,
});

function PostComponent() {
  return (
    <Suspense fallback={<ArticlePageFallback />}>
      <ArticlePage />
    </Suspense>
  );
}
