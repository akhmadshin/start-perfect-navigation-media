import { json } from '@tanstack/start'
import { createAPIFileRoute } from '@tanstack/start/api'
import axios from 'redaxios'
import type { User } from '../../utils/users'
import { getMockArticle } from '@/utils/posts/getMockArticle'
import { Route } from '@/routes/blog.$postId'
import articlesList from '../../../public/mock.json';

export const APIRoute = createAPIFileRoute('/api/posts')({
  GET: async () => {
    const articles = Array.from(Array(20).keys()).map((id) => articlesList[id]);
    return json(articles)
  },
})
