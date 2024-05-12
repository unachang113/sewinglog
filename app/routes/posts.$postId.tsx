/* eslint-disable unicorn/filename-case */
import parse, {Element, type DOMNode} from 'html-react-parser';
import {json, useLoaderData} from '@remix-run/react';
import {type LoaderFunction, type MetaFunction} from '@vercel/remix';
import {type Post} from '../types/posts';
import {client} from '~/lib/client.server';

export const loader: LoaderFunction = async ({params, request}) => {
  // 下書きの場合
  const url = new URL(request.url);
  const draftKey = url.searchParams.get('draftKey');

  // Microcms-js-sdkを使って一覧を取得
  const content = await client
    .get<Post>({
      endpoint: 'contents',
      contentId: params.postId,
      queries: {
        draftKey: draftKey ?? '',
      },
    })
    // 記事が404の場合は404ページへリダイレクト
    .catch(() => {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw new Response('Content Not Found.', {
        status: 404,
      });
    });

  // 下書きの場合キャッシュヘッダを変更
  const headers = draftKey ? {'Cache-Control': 'no-store, max-age=0'} : undefined;

  return json(content, {headers});
};

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: data.title ? `${data.title} | Sewing log` : '記事が見つかりません | Sewing log'}];
};

export default function PostsId() {
  const {title, description, material, publishedAt, category, images} = useLoaderData<
    typeof loader
  >() as Post;
  const image = images[0];
  const imageParameters = '?w=1500&h=1500&q=80&dpx=3&fm=webp';

  return (
    <article className="bg-white shadow-posts">
      <div className="border-primary border-2">
        <div className="flex lg:flex-row-reverse flex-col-reverse flex-wrap gap-2px bg-primary">
          <div className="flex flex-col flex-1 gap-2px">
            <div className="p-4 flex flex-col-reverse lg:gap-2 gap-1 bg-white">
              <h1 className="text-primary lg:text-4xl text-2xl font-bold">{title}</h1>
              <p className="text-secondary font-bold text-sm">
                <time dateTime="2024-12-02">{publishedAt}</time>
              </p>
            </div>
            <div className="p-4 bg-white text-primary text-md flex-col flex gap-4">
              {parse(description)}
            </div>
            {material && (
              <div className="p-4 bg-white">
                <h2 className="text-lg font-bold text-primary">使った素材</h2>
                <div className="text-md text-primary">{parse(material)}</div>
              </div>
            )}
            {category && (
              <div className="px-2 py-4 border-b-primary bg-white flex-1">
                <span
                  data-testid="category"
                  className="lg:text-md text-sm rounded-full bg-secondary text-white px-2 py-1"
                >
                  {category.name}
                </span>
              </div>
            )}
          </div>
          <figure className="lg:w-1/2 w-full bg-white">
            <img
              src={`${image.image.url}${imageParameters}`}
              alt={image.alt}
              width={image.image.width}
              height={image.image.height}
            />
          </figure>
        </div>
      </div>
    </article>
  );
}
