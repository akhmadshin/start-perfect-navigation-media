/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext, useRouter,
} from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import type { QueryClient } from '@tanstack/react-query'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'
import { useEffect } from 'react';
import { handleHistoryTransitionStarted, handleRouteChangeComplete } from 'view-transition-name-handler';
import { Header } from '~/components/Header';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    router.subscribe('onLoad', () => {
      if (router.history.location.state.key) {
        handleRouteChangeComplete(router.history.location.state.key);
      }
    })

    router.history.subscribe((prop) => {
      if (prop.action.type === 'FORWARD' || prop.action.type === 'BACK') {
        if (prop.location.state.key) {
          handleHistoryTransitionStarted(prop.location.state.key);
        }
      }
    })
  }, []);

useEffect(() => {
  requestIdleCallback(() => {
    Promise.all([
      router.loadRouteChunk(router.routesByPath['/']),
      router.loadRouteChunk(router.routesByPath['/blog/$postId']),
    ]).catch((err) => new Error(err));
  });
}, []);

  return (
    <html className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
      <Header />
        <div className="mt-8">
          {children}
        </div>
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
      </body>
    </html>
  )
}
