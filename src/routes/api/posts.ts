import articlesList from '../../../public/mock.json';
import { createServerFileRoute } from '@tanstack/react-start/server'
import { json } from '@tanstack/react-start';

export const ServerRoute = createServerFileRoute('/api/posts').methods({
  GET: async () => {
    const articles = Array.from(Array(20).keys()).map((id) => articlesList[id]);
    return json({
      data: articles,
      meta: {},
    })
  },
})
