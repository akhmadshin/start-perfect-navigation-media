import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '@/pages/HomePage';
import { postsQueryOptions } from '@/utils/posts/useHomePageData';

export const Route = createFileRoute('/')({
  loader: async ({ context, cause }) => {
    if (cause !== 'preload' && typeof window !== 'undefined') {
      return;
    }
    await context.queryClient.ensureQueryData(postsQueryOptions())
  },
  head: () => ({
    meta: [{ title: 'Posts' }],
  }),
  component: HomePageComponent,
})

function HomePageComponent() {
  return (
    <HomePage />
  )
}
