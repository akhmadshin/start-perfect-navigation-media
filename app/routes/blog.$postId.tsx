import { ErrorComponent, createFileRoute } from '@tanstack/react-router'
import { NotFound } from '@/components/NotFound'
import React from 'react'
import { BlogItemPage } from '@/pages/BlogItemPage';
import { blogItemPageOptions, useBlogItemPageData } from '@/utils/posts/useBlogItemPageData';
import { WithErrorHandler } from '@/components/WithErrorHandler';

const NotFoundRouteComponent = () => <NotFound>Post not found</NotFound>

export const Route = createFileRoute('/blog/$postId')({
  loader: async ({ params: { postId }, context, cause }) => {
    if (cause !== 'preload' || typeof window !== 'undefined') {
      return;
    }
    const data = await context.queryClient.ensureQueryData(
      blogItemPageOptions(postId),
    )
    return {
      title: data.attributes.title,
    }
  },
  errorComponent: ErrorComponent,
  notFoundComponent: NotFoundRouteComponent,
  component: PostComponent,
});

function PostComponent() {
  const { error } = useBlogItemPageData(Route);

  return (
    <WithErrorHandler
      notFoundComponent={Route.options.notFoundComponent}
      errorComponent={Route.options.errorComponent}
      error={error}
    >
      <BlogItemPage />
    </WithErrorHandler>
  )
}
