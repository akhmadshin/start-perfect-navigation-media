import { createFileRoute, ErrorComponent } from '@tanstack/react-router'
import { HomePage } from '@/pages/HomePage';
import { postsQueryOptions, useHomePageData } from '@/utils/posts/useHomePageData';
import React from 'react';

export const Route = createFileRoute('/')({
  loader: async ({ context, cause }) => {
    if (cause === 'preload' || typeof window === 'undefined') {
      await context.queryClient.ensureQueryData(postsQueryOptions())
    }
  },
  component: HomePageComponent,
  errorComponent: ErrorComponent,
})

function HomePageComponent() {
  const { error } = useHomePageData();

  if (error) {
    return <ErrorComponent error={error} />
  }

  return (
    <HomePage />
  )
}
