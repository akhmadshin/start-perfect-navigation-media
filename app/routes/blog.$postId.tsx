import { ErrorComponent, createFileRoute } from '@tanstack/react-router'
import { NotFound } from '@/components/NotFound'
import React from 'react'
import { BlogItemPage } from '@/pages/BlogItemPage';
import { postQueryOptions, useBlogItemPageData } from '@/utils/posts/useBlogItemPageData';

const NotFoundRouteComponent = () => <NotFound>Post not found</NotFound>

export const Route = createFileRoute('/blog/$postId')({
  loader: async ({ params: { postId }, context, cause, route }) => {
    const slugInt = parseInt(postId.match(/\d+/)![0]) ?? 0;
    if (cause === 'preload' || typeof window === 'undefined') {
      const data = await context.queryClient.ensureQueryData(
        postQueryOptions(slugInt),
      )

      return {
        title: data.attributes.title,
      }
    }
  },
  errorComponent: ErrorComponent,
  notFoundComponent: NotFoundRouteComponent,
  component: PostComponent,
})

function PostComponent() {
  const { error } = useBlogItemPageData();
  if (error) {
    if (error.isNotFound) {
      return <NotFoundRouteComponent />
    }
    return <ErrorComponent error={error} />
  }

  return (
    <BlogItemPage />
  )
}