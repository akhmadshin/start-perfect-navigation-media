import articlesList from '../../../public/mock.json';
import { createAPIFileRoute } from '@tanstack/react-start/api';
import { json } from '@tanstack/react-start';

export const APIRoute = createAPIFileRoute('/api/posts')({
  GET: async () => {
    const articles = Array.from(Array(20).keys()).map((id) => articlesList[id]);
    return json({
      data: articles,
      meta: {},
    })
  },
})
