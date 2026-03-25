import articlesList from '../../../public/mock.json';
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start';

export const Route = createFileRoute('/api/posts')({
  server: {
    handlers: {
      GET: async () => {
        // @ts-ignore
        const articles = Array.from(Array(20).keys())
          .map((id) => articlesList[id])
          .map(({ attributes, id }) => {
            const { content, ...formattedAttributes } = attributes;
            return {
              id,
              attributes: formattedAttributes
            }
          });
        return json({
          data: articles,
          meta: {},
        })
      },
    },
  },
})
