import { Route } from '~/routes/blog.$postId';
import { queryOptions, useQuery } from '@tanstack/react-query';
import axios from 'redaxios';
import { getPlaceholderData } from '~/singletones/placeholderData';
import { APIResponseData, ArticleItem, ArticleListItem } from '~/types/api';

export const fetchPost = async (id: string) => {
  const slugInt = parseInt(id.match(/\d+/)![0]) ?? 0;
  const post = await axios.get(`${import.meta.env.VITE_SITE_ORIGIN || 'http://localhost:3000'}/api/posts/${slugInt}`) as any
  return post.data;
}

export const blogItemPageOptions = (postId: string, placeholderData?: APIResponseData<ArticleListItem>) =>
  queryOptions<APIResponseData<ArticleItem | ArticleListItem>, Error & { isNotFound: boolean }>({
    queryKey: ['blog', postId],
    retry: 0,
    staleTime: Infinity,
    queryFn: () => fetchPost(postId),
    placeholderData,
  })

export const useBlogItemPageData = () => {
  const placeholderData = getPlaceholderData() as APIResponseData<ArticleListItem>;
  const { postId } = Route.useParams()
  const queryData = useQuery(
    blogItemPageOptions(
      postId,
      placeholderData,
    ),
  );
  return queryData;
}