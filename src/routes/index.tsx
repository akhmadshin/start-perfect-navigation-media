import React from 'react';
import { createFileRoute, ErrorComponent } from '@tanstack/react-router'

import { HomePage } from '~/pages/HomePage';
import { homePageQueryOptions, useHomePageData } from '~/utils/posts/useHomePageData';
import { createIsomorphicFn } from '@tanstack/react-start';

const myLoader = createIsomorphicFn()
  .server(async ({ context }) => {
    await context.queryClient.ensureQueryData(homePageQueryOptions())
  })
  .client(() => {})

export const Route = createFileRoute('/')({
  loader: myLoader,
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
