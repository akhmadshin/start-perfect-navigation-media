# Optimistic Navigation
That project exists because I set a goal for myself of creating a website that would have consistently fast navigation regardless of the Internet speed or CPU performance.

I could simply use prefetching to achieve my goal. But prefetching at scale is expensive and wasteful, so I decided to go the other way. Rather than preloading content, I attempted to create the illusion that it's already loaded. I call it "Optimistic Navigation."

Let's assume that data from the entity list request matches the data from the entity detail request. Then, when a user navigates from a page with an entity list to an entity detail page, the page can be rendered optimistically (synchronously) with data from the entity list. With that idea in mind, I was able to hide around 2 seconds of network latency during soft navigation.

Optimistic navigation has a positive impact on user engagement, SEO, and hosting bills. But to implement it, tight cooperation between the backend, frontend, and design teams is required.

Read that interactive article to find out more about optimistic navigation!
- [Optimistic Navigation: Creating the Illusion of Performance](https://akhmadshin.dev/blog/optimistic-navigation-performance-illusion/)


## Development

From your terminal:

```sh
npm install
npm dev
```