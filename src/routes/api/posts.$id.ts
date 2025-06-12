import { getMockArticle } from '~/utils/posts/getMockArticle';
import { json } from '@tanstack/react-start';
import { createServerFileRoute } from '@tanstack/react-start/server';

export const ServerRoute = createServerFileRoute('/api/posts/$id').methods({
  GET: async ({ request, params }) => {
    console.info(`Fetching posts by id=${params.id}... @`, request.url)
    try {
      const slugInt = parseInt(params.id.match(/\d+/)![0]) ?? 0;
      const post = getMockArticle(slugInt);

      return json(post)
    } catch (e) {
      console.error(e)
      return json({ error: 'Post not found' }, { status: 404 })
    }
  },
})
