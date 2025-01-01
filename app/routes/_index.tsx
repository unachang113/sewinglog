import {type MetaFunction} from '@vercel/remix';
import {useLoaderData} from 'react-router';
import {CardList, type CardListType} from './__components/card-list';
import {
  defaultMetaDescription,
  defaultMetaTitle,
  defaultOgImage,
  defaultSiteUrl,
  metaParameters,
} from './__constants/meta';
import {client} from '~/lib/client.server';

export const meta: MetaFunction = () => {
  return [
    {title: defaultMetaTitle},
    {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'script:ld+json': {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '@context': 'https://schema.org',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '@type': 'WebSite',
        headline: defaultMetaTitle,
        description: defaultMetaDescription,
        url: defaultSiteUrl,
        image: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          '@type': 'ImageObject',
          url: defaultOgImage,
          width: 1200,
          height: 630,
        },
        author: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          '@type': 'Person',
          name: 'unachang113',
          address: 'Japan',
        },
      },
    },
    {name: 'description', content: defaultMetaDescription},
    {name: 'og:title', content: defaultMetaTitle},
    {name: 'og:description', content: defaultMetaDescription},
    {name: 'og:type', content: 'website'},
    {name: 'og:url', content: defaultSiteUrl},
    {name: 'og:image', content: defaultOgImage},
    {name: 'og:site_name', content: defaultMetaTitle},
    {name: 'twitter:title', content: defaultMetaTitle},
    ...metaParameters,
  ];
};

type CardListResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: CardListType;
};

export const loader = async () => {
  // Microcms-js-sdkを使って一覧を取得
  const data = await client.get<CardListResponse>({
    endpoint: 'contents',
    queries: {limit: 12, orders: '-publishedAt', fields: 'id,title,images,category,publishedAt'},
  });
  const {contents} = data;
  return contents;
};

export default function Index() {
  const contents = useLoaderData<typeof loader>() as CardListType;

  return (
    <article className="flex gap-5 flex-col">
      <h1 className="text-primary font-bold text-3xl font-logo">New Item</h1>
      <CardList posts={contents} />
    </article>
  );
}
