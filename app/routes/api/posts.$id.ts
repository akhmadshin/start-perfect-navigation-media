import { json } from '@tanstack/start'
import { createAPIFileRoute } from '@tanstack/start/api'
import axios from 'redaxios'
import type { User } from '../../utils/users'
import { getMockArticle } from '@/utils/posts/getMockArticle';
import { Route } from '@/routes/blog.$postId';

export const APIRoute = createAPIFileRoute('/api/posts/$id')({
  GET: async ({ request, params }) => {
    console.info(`Fetching posts by id=${params.id}... @`, request.url)
    try {
      const slugInt = parseInt(params.id.match(/\d+/)![0]) ?? 0;
      const post = getMockArticle(slugInt) as any

      return json(post)
    } catch (e) {
      console.error(e)
      return json({ error: 'Post not found' }, { status: 404 })
    }
  },
})
