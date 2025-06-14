/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createServerRootRoute } from '@tanstack/react-start/server'

import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as BlogPostIdRouteImport } from './routes/blog.$postId'
import { ServerRoute as ApiPostsServerRouteImport } from './routes/api/posts'
import { ServerRoute as ApiPostsIdServerRouteImport } from './routes/api/posts.$id'

const rootServerRouteImport = createServerRootRoute()

const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const BlogPostIdRoute = BlogPostIdRouteImport.update({
  id: '/blog/$postId',
  path: '/blog/$postId',
  getParentRoute: () => rootRouteImport,
} as any)
const ApiPostsServerRoute = ApiPostsServerRouteImport.update({
  id: '/api/posts',
  path: '/api/posts',
  getParentRoute: () => rootServerRouteImport,
} as any)
const ApiPostsIdServerRoute = ApiPostsIdServerRouteImport.update({
  id: '/$id',
  path: '/$id',
  getParentRoute: () => ApiPostsServerRoute,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/blog/$postId': typeof BlogPostIdRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/blog/$postId': typeof BlogPostIdRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/blog/$postId': typeof BlogPostIdRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/blog/$postId'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/blog/$postId'
  id: '__root__' | '/' | '/blog/$postId'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  BlogPostIdRoute: typeof BlogPostIdRoute
}
export interface FileServerRoutesByFullPath {
  '/api/posts': typeof ApiPostsServerRouteWithChildren
  '/api/posts/$id': typeof ApiPostsIdServerRoute
}
export interface FileServerRoutesByTo {
  '/api/posts': typeof ApiPostsServerRouteWithChildren
  '/api/posts/$id': typeof ApiPostsIdServerRoute
}
export interface FileServerRoutesById {
  __root__: typeof rootServerRouteImport
  '/api/posts': typeof ApiPostsServerRouteWithChildren
  '/api/posts/$id': typeof ApiPostsIdServerRoute
}
export interface FileServerRouteTypes {
  fileServerRoutesByFullPath: FileServerRoutesByFullPath
  fullPaths: '/api/posts' | '/api/posts/$id'
  fileServerRoutesByTo: FileServerRoutesByTo
  to: '/api/posts' | '/api/posts/$id'
  id: '__root__' | '/api/posts' | '/api/posts/$id'
  fileServerRoutesById: FileServerRoutesById
}
export interface RootServerRouteChildren {
  ApiPostsServerRoute: typeof ApiPostsServerRouteWithChildren
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/blog/$postId': {
      id: '/blog/$postId'
      path: '/blog/$postId'
      fullPath: '/blog/$postId'
      preLoaderRoute: typeof BlogPostIdRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}
declare module '@tanstack/react-start/server' {
  interface ServerFileRoutesByPath {
    '/api/posts': {
      id: '/api/posts'
      path: '/api/posts'
      fullPath: '/api/posts'
      preLoaderRoute: typeof ApiPostsServerRouteImport
      parentRoute: typeof rootServerRouteImport
    }
    '/api/posts/$id': {
      id: '/api/posts/$id'
      path: '/$id'
      fullPath: '/api/posts/$id'
      preLoaderRoute: typeof ApiPostsIdServerRouteImport
      parentRoute: typeof ApiPostsServerRoute
    }
  }
}

interface ApiPostsServerRouteChildren {
  ApiPostsIdServerRoute: typeof ApiPostsIdServerRoute
}

const ApiPostsServerRouteChildren: ApiPostsServerRouteChildren = {
  ApiPostsIdServerRoute: ApiPostsIdServerRoute,
}

const ApiPostsServerRouteWithChildren = ApiPostsServerRoute._addFileChildren(
  ApiPostsServerRouteChildren,
)

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  BlogPostIdRoute: BlogPostIdRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
const rootServerRouteChildren: RootServerRouteChildren = {
  ApiPostsServerRoute: ApiPostsServerRouteWithChildren,
}
export const serverRouteTree = rootServerRouteImport
  ._addFileChildren(rootServerRouteChildren)
  ._addFileTypes<FileServerRouteTypes>()
