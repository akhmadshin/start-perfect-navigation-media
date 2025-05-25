import { Route } from '~/routes/blog.$postId';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { BlogItemPageProps } from '~/types/pages/blogItemPage';
import axios from 'redaxios';
import { getPlaceholderData } from '~/singletones/placeholderData';

export const fetchPost = async (id: string) => {
  const slugInt = parseInt(id.match(/\d+/)![0]) ?? 0;
  const post = await axios.get(`${import.meta.env.VITE_SITE_ORIGIN || 'http://localhost:3000'}/api/posts/${slugInt}`) as any
  return post.data;
}

export const blogItemPageOptions = (postId: string, placeholderData?: any, fetchFn?: any) =>
  queryOptions<BlogItemPageProps, Error & { isNotFound: boolean }>({
    queryKey: ['blog', postId],
    retry: 0,
    staleTime: Infinity,
    queryFn: () => fetchFn ? fetchFn() : fetchPost(postId),
    placeholderData,
  })

export const useBlogItemPageData = () => {
  const placeholderData = getPlaceholderData();
  const { postId } = Route.useParams()
  const queryData = useQuery(
    blogItemPageOptions(
      postId,
      placeholderData,
    ),
  );
  return queryData;
}