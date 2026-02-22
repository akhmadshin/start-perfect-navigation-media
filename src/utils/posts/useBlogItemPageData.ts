import { Route } from '~/routes/blog.$postId';
import { QueryClient, queryOptions, useQuery } from '@tanstack/react-query';
import axios from 'redaxios';
import { APIResponseData, ArticleItem, ArticleListApi, ArticleListItem } from '~/types/api';
import { useQueryClient } from '@tanstack/react-query';

export const fetchPost = async (id: string) => {
  const slugInt = parseInt(id.match(/\d+/)![0]) ?? 0;
  const post = await axios.get(`${import.meta.env.VITE_SITE_ORIGIN || 'http://localhost:3000'}/api/posts/${slugInt}`) as any
  return post.data;
}

export const blogItemPageOptions = (postId: string, queryClient?: QueryClient) =>
  queryOptions<APIResponseData<ArticleItem | ArticleListItem>, Error & { isNotFound: boolean }>({
    queryKey: ["blogList", postId],
    retry: 0,
    staleTime: Infinity,
    queryFn: () => fetchPost(postId),
    placeholderData: () => {
      if (!queryClient) {
        return;
      }
      const listData = queryClient.getQueryData(["blogList"]) as ArticleListApi;
      return listData?.data.find((item) => item.attributes.slug === postId);
    },
  })

export const useBlogItemPageData = () => {
  const queryClient = useQueryClient();
  const { postId } = Route.useParams()
  const queryData = useQuery(
    blogItemPageOptions(
      postId,
      queryClient,
    ),
  );
  return queryData;
}