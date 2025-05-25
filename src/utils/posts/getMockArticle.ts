import articlesList from '../../../public/mock.json';
import { getMockArticleList } from './getMockArticleList';
import { APIResponseData, ArticleItemApi, ArticleListItem } from '~/types/api';

export const getMockArticle = (origId: number) => {
  const id = origId % 20;
  const relatedArticles = [
    getMockArticleList(origId + 1),
    getMockArticleList(origId + 2),
    getMockArticleList(origId + 3),
    getMockArticleList(origId + 4),
  ] as APIResponseData<ArticleListItem>[];
  const title = `Lorem ipsum ${origId}`;
  const slug = `lorem-ipsum-${origId}`;
  return {
    ...articlesList[id],
    attributes: {
      ...articlesList[id].attributes,
      relatedArticles,
      title,
      slug,
    }
  } as ArticleItemApi
};