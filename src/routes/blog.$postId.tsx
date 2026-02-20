import { ErrorComponent, createFileRoute } from '@tanstack/react-router'
import { NotFound } from '~/components/NotFound'
import React from 'react'
import { ArticlePage } from 'src/pages/ArticlePage';
import { blogItemPageOptions, useBlogItemPageData } from '~/utils/posts/useBlogItemPageData';
import { WithErrorHandler } from '~/components/WithErrorHandler';
import { createIsomorphicFn } from '@tanstack/react-start';

const NotFoundRouteComponent = () => <NotFound>Post not found</NotFound>

const myLoader = createIsomorphicFn()
  .server(async ({ params: { postId }, context }) => {
    const data = await context.queryClient.ensureQueryData(
      blogItemPageOptions(postId),
    )
    return {
      title: data.attributes.title,
    }
  })
  .client(() => {})

export const Route = createFileRoute('/blog/$postId')({
  loader: myLoader,
  errorComponent: ErrorComponent,
  head: ({ loaderData }) => ({
    // meta: loaderData ? [{ title: loaderData.title }] : undefined,
  }),
  notFoundComponent: NotFoundRouteComponent,
  component: PostComponent,
});

function PostComponent() {
  const { error } = useBlogItemPageData();

  return (
    <WithErrorHandler
      notFoundComponent={Route.options.notFoundComponent}
      errorComponent={Route.options.errorComponent}
      error={error}
    >
      <ArticlePage />
    </WithErrorHandler>
  )
}
