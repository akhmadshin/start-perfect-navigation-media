import {
  Outlet,
  ScrollRestoration,
  createRootRouteWithContext, useRouter,
} from '@tanstack/react-router'
import { Meta, Scripts } from '@tanstack/start'
import * as React from 'react'
import type { QueryClient } from '@tanstack/react-query'
import { DefaultCatchBoundary } from '@/components/DefaultCatchBoundary'
import { NotFound } from '@/components/NotFound'
import appCss from '@/styles/app.css?url'
import ytEmbed from '@/styles/yt-embed.css?url'
import { seo } from '@/utils/seo'
import { Layout } from '@/components/Layout';
import { useEffect } from 'react';

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
      { rel: 'stylesheet', href: ytEmbed },
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
    try {
      Promise.all([
        router.loadRouteChunk(router.routesByPath['/']),
        router.loadRouteChunk(router.routesByPath['/blog/$postId']),
      ])
    } catch (err) {
      // Failed to preload route chunk
    }
  }, []);

  return (
    <html className="scroll-smooth scroll-pt-16">
      <head>
        <Meta />
      </head>
      <body>
        <Layout>
          {children}
        </Layout>
        <ScrollRestoration />
        {/*<TanStackRouterDevtools position="bottom-right" />*/}
        {/*<ReactQueryDevtools buttonPosition="bottom-left" />*/}
        <Scripts />
      </body>
    </html>
  )
}
