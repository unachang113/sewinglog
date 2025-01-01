/* eslint-disable unicorn/filename-case */
import parse from 'html-react-parser';
import {useLoaderData} from 'react-router';
import {type LoaderFunctionArgs, type MetaFunction} from '@vercel/remix';
import {type Post} from '../types/posts';
import {TimeText} from './__components/time-text';
import {
  defaultMetaDescription,
  defaultMetaTitle,
  defaultOgImage,
  defaultSiteUrl,
  metaParameters,
} from './__constants/meta';
import {client} from '~/lib/client.server';

export const loader = async ({params, request}: LoaderFunctionArgs) => {
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
  // const headers = draftKey ? {'Cache-Control': 'no-store, max-age=0'} : undefined;

  return content;
};

export const meta: MetaFunction = ({data}) => {
  const {id, title, description, publishedAt, modifiedAt, images, category} = data as Post;
  const image = images[0];

  return [
    {
      title: title
        ? `${title} | ${defaultMetaTitle}`
        : `記事が見つかりません | ${defaultMetaTitle}`,
    },
    {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'script:ld+json': {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '@context': 'https://schema.org',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '@type': 'CreativeWork',
        about: title,
        abstract: description,
        accountablePerson: 'unachang113',
        thumbnailUrl: image ? image.image.url : '',
        url: `${defaultSiteUrl}/posts/${id}`,
        datePublished: publishedAt,
        dateModified: modifiedAt,
        author: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          '@type': 'Person',
          name: 'unachang113',
          address: 'Japan',
        },
        keywords: category ? [category.name] : [],
      },
    },
    {
      name: 'application-name',
      content: title
        ? `${title} | ${defaultMetaTitle}`
        : `記事が見つかりません | ${defaultMetaTitle}`,
    },
    {
      name: 'description',
      content: description ?? defaultMetaDescription,
    },
    {
      name: 'og:title',
      content: title
        ? `${title} | ${defaultMetaTitle}`
        : `記事が見つかりません | ${defaultMetaTitle}`,
    },
    {
      name: 'og:description',
      content: description ?? defaultMetaDescription,
    },
    {name: 'og:type', content: 'article'},
    {name: 'og:url', content: `${defaultSiteUrl}/posts/${id}`},
    {
      name: 'og:image',
      content: image ? image.image.url : defaultOgImage,
    },
    {
      name: 'og:site_name',
      content: title
        ? `${title} | ${defaultMetaTitle}`
        : `記事が見つかりません | ${defaultMetaTitle}`,
    },
    {
      name: 'twitter:title',
      content: title
        ? `${title} | ${defaultMetaTitle}`
        : `記事が見つかりません | ${defaultMetaTitle}`,
    },
    {name: 'article:published_time', content: publishedAt},
    {name: 'article:modified_time', content: modifiedAt},
    {name: 'article:author', content: 'unachang113'},
    ...metaParameters,
  ];
};

export default function PostsId() {
  const {title, description, publishedAt, images, category, material} =
    useLoaderData<typeof loader>();
  const image = images[0];
  const imageParameters = '?w=1500&h=1500&q=80&dpx=3&fm=webp';

  return (
    <article className="bg-white shadow-posts">
      <div className="border-primary border-2">
        <div className="flex lg:flex-row-reverse flex-col-reverse flex-wrap gap-2px bg-primary">
          <div className="flex flex-col flex-1 gap-2px">
            <div className="p-4 flex flex-col-reverse lg:gap-2 gap-1 bg-white">
              <h1 className="text-primary lg:text-4xl text-2xl font-bold">{title}</h1>
              {publishedAt && (
                <p className="text-secondary font-bold text-sm">
                  <TimeText dateTime={publishedAt} />
                </p>
              )}
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
