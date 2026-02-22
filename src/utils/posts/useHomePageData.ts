import  { queryOptions, useQuery } from '@tanstack/react-query';
import axios from 'redaxios';
import { ArticleListApi } from '~/types/api';

const fetchPosts = async () => {
  const post = await axios.get<ArticleListApi>(`${import.meta.env.VITE_SITE_ORIGIN || 'http://localhost:3000'}/api/posts`);
  return post.data;
}

export const homePageQueryOptions = () =>
  queryOptions({
    queryKey: ['blogList'],
    retry: 0,
    staleTime: Infinity,
    queryFn: () => fetchPosts(),
  })

export const useHomePageData = () => {
  const queryData = useQuery(
    homePageQueryOptions(),
  );
  return queryData;
}