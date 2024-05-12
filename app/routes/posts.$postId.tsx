/* eslint-disable unicorn/filename-case */
import {type LoaderFunction, type MetaFunction} from '@vercel/remix';

export const meta: MetaFunction = () => {
  return [{title: 'New Remix App'}, {name: 'description', content: 'Welcome to Remix!'}];
};

// Export const loader: LoaderFunction = async () => {
//   // Microcms-js-sdkを使って一覧を取得
//   const {contents} = await client.getList<>({
//     endpoint: 'contents',
//     queries: {, orders: '-publishedAt', fields: 'id,title,images,category,publishedAt'},
//   });
//   return contents;
// };

export default function PostsId() {
  // Const contents = useLoaderData();
  return (
    <article className="bg-white shadow-posts">
      <div className="border-primary border-2">
        <div className="flex md:flex-row-reverse flex-col-reverse flex-wrap gap-2px bg-primary">
          <div className="flex flex-col flex-1 gap-2px">
            <div className="p-4 flex flex-col-reverse md:gap-2 gap-1 bg-white">
              <h1 className="text-primary md:text-4xl text-2xl font-bold">タイトル</h1>
              <p className="text-secondary font-bold text-sm">
                <time dateTime="2024-12-02">2024.12.02</time>
              </p>
            </div>
            <div className="p-4 bg-white text-primary text-md">
              <p>本文</p>
            </div>
            <div className="p-4 bg-white">
              <h2 className="text-lg font-bold text-primary">Materials</h2>
              <p className="text-md text-primary">素材</p>
            </div>
            <div className="p-4 border-b-primary bg-white flex-1">
              <ul>
                <li>
                  <span
                    data-testid="category"
                    className="md:text-md text-sm rounded-full bg-secondary text-white px-2 py-1"
                  >
                    かてごりー
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <figure className="md:w-1/2 w-full border-primary">
            <img src="https://placehold.jp/750x750.png" alt="画像の説明" />
          </figure>
        </div>
      </div>
    </article>
  );
}
