import { ErrorComponent, createFileRoute } from '@tanstack/react-router'
import { NotFound } from '@/components/NotFound'
import React from 'react'
import { BlogItemPage } from '@/pages/BlogItemPage';
import { postQueryOptions, useBlogItemPageData } from '@/utils/posts/useBlogItemPageData';

const NotFoundRouteComponent = () => <NotFound>Post not found</NotFound>

const BlogItemErrorComponent = ({ error }: { error: Error}) => {
  return <ErrorComponent error={error} />
}

export const Route = createFileRoute('/blog/$postId')({
  loader: async ({ params: { postId }, context, cause, route }) => {
    if (cause !== 'preload' && typeof window !== 'undefined') {
      return;
    }
    const slugInt = parseInt(postId.match(/\d+/)![0]) ?? 0;

    const data = await context.queryClient.ensureQueryData(
      postQueryOptions(slugInt),
    )

    return {
      title: data.title,
    }
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: loaderData.title }] : undefined,
  }),
  errorComponent: BlogItemErrorComponent,
  notFoundComponent: NotFoundRouteComponent,
  component: PostComponent,
})

function PostComponent() {
  const { data, error } = useBlogItemPageData();
  if ((error as unknown as { isNotFound: boolean })?.isNotFound) {
    return <NotFoundRouteComponent />
  }
  if (error) {
    return <BlogItemErrorComponent error={error} />
  }

  if (!data) {
    // Suspense loader
    return <div>Loading...</div>
  }

  return (
    <BlogItemPage />
  )
}