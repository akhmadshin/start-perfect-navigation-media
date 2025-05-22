import React from 'react';
import { createFileRoute, ErrorComponent } from '@tanstack/react-router'

import { HomePage } from '@/pages/HomePage';
import { homePageQueryOptions, useHomePageData } from '@/utils/posts/useHomePageData';

export const Route = createFileRoute('/')({
  loader: async ({ context, cause }) => {
    if (cause !== 'preload' || typeof window !== 'undefined') {
      return;
    }
    await context.queryClient.ensureQueryData(homePageQueryOptions())
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
