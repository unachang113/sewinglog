import {Link} from '@remix-run/react';

type Image = {
  readonly url: string;
  readonly alt: string;
  width: number;
  height: number;
};

type Category = {
  readonly id: string;
  readonly name: string;
};

type Properties = {
  readonly title: string;
  readonly publishedAt: string;
  readonly image: Image;
  readonly id: string;
  readonly category?: Category;
};

export function Card({title, publishedAt, image, id, category}: Properties) {
  const imageParameters = '?w=600&h=600&q=80&dpx=3&fm=webp';

  return (
    <article className="border-2 border-black">
      <Link to={{pathname: `/posts/${id}`}}>
        <figure className="border-b-2 border-black">
          <img
            src={`${image.url}${imageParameters}`}
            alt={image.alt}
            width={image.width}
            height={image.height}
          />
        </figure>
        <div className="p-4">
          <h2 className="font-bold text-base mb-1">{title}</h2>
          <div className="flex flex-wrap justify-between items-center">
            <span className="text-xs">
              <time dateTime={publishedAt}>{publishedAt}</time>
            </span>
            {category && (
              <span
                data-testid="category"
                className="text-xs rounded-full bg-slate-700 text-white px-2 py-1"
              >
                {category.name}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
