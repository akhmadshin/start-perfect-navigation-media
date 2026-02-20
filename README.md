# Perfect navigation starter
That project exists because I set a goal for myself of creating a website that would have consistently fast navigation regardless of the Internet speed or CPU performance.

Prefetching almost fits as a solution, but it lacks consistency; if a user clicks the link before the content has preloaded, they will experience a delay. Besides, prefetching at scale results in significant costs—both financial and environmental. Rather than preloading content, I attempted to create the illusion that it's already loaded by using optimistic UI with predicted data.

Let's assume that data from the entity list request matches the data from the entity detail request. Then, when a user navigates from a page with an entity list to an entity detail page, the page can be rendered optimistically (synchronously) with data from the entity list. With that idea in mind, I was able to hide around 2 seconds of network latency during soft navigation.

Here's an interactive article that reviews that idea in details:
- [Boost Web Performance with client-side prediction](https://akhmadshin.dev/blog/optimistic-navigation-boost-perceived-performance)

## That starter includes next optimizations: 
- Synchronous navigation (optimistic UI with client-side prediction).
- Optimized responsive images with thumbhash and preloading strategies.
- SSR to SPA via createIsomorphicFn for loader function.
- react-query for client-side route data requests through.
- Route chunks preloading on initial load.
- Granular optimistic UI updates through react-query placeholderData prop (without Suspense/useSuspenseQuery).

## Development

From your terminal:

```sh
npm install
npm dev
```
