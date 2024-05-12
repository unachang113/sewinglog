import {type LoaderFunction, type MetaFunction} from '@vercel/remix';
import {useLoaderData} from '@remix-run/react';
import {Header} from './components/header';
import {CardList, type CardListType} from './components/card-list';
import {client} from '~/lib/client.server';

export const meta: MetaFunction = () => {
  return [{title: 'New Remix App'}, {name: 'description', content: 'Welcome to Remix!'}];
};

export const loader: LoaderFunction = async () => {
  // Microcms-js-sdkを使って一覧を取得
  const {contents} = await client.getList<CardListType>({
    endpoint: 'contents',
    queries: {limit: 12, orders: '-publishedAt', fields: 'id,title,images,category,publishedAt'},
  });
  return contents;
};

export default function Index() {
  const contents = useLoaderData<CardListType>() as CardListType;
  return (
    <article className="flex gap-5 flex-col">
      <h1 className="text-primary font-bold text-3xl font-logo">New Item</h1>
      <CardList posts={contents} />
    </article>
  );
}
