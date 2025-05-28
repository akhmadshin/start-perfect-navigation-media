import React from 'react';
import { createFileRoute, ErrorComponent } from '@tanstack/react-router'

import { HomePage } from '~/pages/HomePage';
import { homePageQueryOptions, useHomePageData } from '~/utils/posts/useHomePageData';
import { createIsomorphicFn } from '@tanstack/react-start';
import { WithErrorHandler } from '~/components/WithErrorHandler';

const loader = createIsomorphicFn()
  .server(async ({ context }) => {
    await context.queryClient.ensureQueryData(homePageQueryOptions())
  })
  .client(() => {})

export const Route = createFileRoute('/')({
  loader,
  component: HomePageComponent,
  errorComponent: ErrorComponent,
})

function HomePageComponent() {
  const { error } = useHomePageData();

  return (
    <WithErrorHandler
      notFoundComponent={Route.options.notFoundComponent}
      errorComponent={Route.options.errorComponent}
      error={error}
    >
      <HomePage />
    </WithErrorHandler>
  );
}
