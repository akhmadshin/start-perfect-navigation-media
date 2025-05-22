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
import viewTransitions from '@/styles/view-transitions.css?url'
import { Layout } from '@/components/Layout';
import { useEffect } from 'react';
import { handleHistoryTransitionStarted } from '@/rich-view-transitions/handle-history-transition-started';
import { handleRouteChangeComplete } from '@/rich-view-transitions/handle-route-change-complete';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'stylesheet', href: ytEmbed },
      { rel: 'stylesheet', href: viewTransitions },
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
      handleRouteChangeComplete(router.history.location.state.key);
    })
    router.subscribe('onBeforeNavigate', (event) => {
      console.log('event.pathChanged = ', event.pathChanged);
      console.log('event.hrefChanged = ', event.hrefChanged);
      console.log('event.fromLocation = ', event.fromLocation);
      console.log('event.toLocation = ', event.toLocation);
    })

    router.history.subscribe((prop) => {
      if (prop.action.type === 'POP') {
        handleHistoryTransitionStarted(prop.location.state.key);
      }
    })
  }, []);

  useEffect(() => {
    Promise.all([
      router.loadRouteChunk(router.routesByPath['/']),
      router.loadRouteChunk(router.routesByPath['/blog/$postId']),
    ]).catch((err) => new Error(err));
  }, []);

  return (
    <html className="scroll-pt-16">
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
