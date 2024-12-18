import { Route } from '@/routes/blog.$postId';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { BlogItemPageProps } from '@/types/pages/blogItemPage';
import axios from 'redaxios';


export const fetchPost = async (id: number) => {
  const post = await axios.get(`${import.meta.env.VITE_SITE_ORIGIN || 'http://localhost:3000'}/api/posts/${id}`) as any
  return post.data;
}

export const postQueryOptions = (postId: number, placeholderData?: any) =>
  queryOptions({
    queryKey: ['post', postId],
    retry: 0,
    staleTime: Infinity,
    queryFn: () => fetchPost(postId),
    placeholderData,
  })

export const useBlogItemPageData = () => {
  const { postId } = Route.useParams()
  const slugInt = parseInt(postId.match(/\d+/)![0]) ?? 0;
  const queryData = useQuery<BlogItemPageProps>(
    postQueryOptions(
      slugInt,
      typeof window !== 'undefined' ? window.placeholderData : undefined,
    ),
  );
  return queryData;
}