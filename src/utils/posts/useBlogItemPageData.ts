import { Route } from '~/routes/blog.$postId';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import axios from 'redaxios';
import { APIResponseData, ArticleItem } from '~/types/api';

export const fetchPost = async (id: string) => {
  const slugInt = parseInt(id.match(/\d+/)![0]) ?? 0;
  const post = await axios.get(`${import.meta.env.VITE_SITE_ORIGIN || 'http://localhost:3000'}/api/posts/${slugInt}`) as any
  return post.data;
}

export const blogItemPageOptions = (postId: string) =>
  queryOptions<APIResponseData<ArticleItem>, Error & { isNotFound: boolean }>({
    queryKey: ['blog', postId],
    retry: 0,
    staleTime: Infinity,
    queryFn: () => fetchPost(postId),
  })

export const useBlogItemPageData = () => {
  const { postId } = Route.useParams()
  const queryData = useSuspenseQuery(
    blogItemPageOptions(
      postId,
    ),
  );
  return queryData;
}