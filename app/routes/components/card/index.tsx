import {Link} from '@remix-run/react';
import {type MicroCMSContentId, type MicroCMSDate, type MicroCMSImage} from 'microcms-js-sdk';

export type Image = {
  readonly fieldId: string;
  readonly image: MicroCMSImage;
  readonly alt: string;
};

export type Category = {
  readonly name: string;
} & MicroCMSDate &
  MicroCMSContentId;

export type CardProperties = {
  readonly title: string;
  readonly images: Image[];
  readonly category?: Category;
  readonly publishedAt: MicroCMSDate['publishedAt'];
} & MicroCMSContentId;

export function Card({title, publishedAt, images, id, category}: CardProperties) {
  const thumbnailParameters = '?w=600&h=600&q=80&dpx=3&fm=webp';
  const thumbnail = images[0];

  return (
    <article className="border-2 border-black">
      <Link to={{pathname: `/posts/${id}`}}>
        <figure className="border-b-2 border-black">
          <img
            src={`${thumbnail.image.url}${thumbnailParameters}`}
            alt={thumbnail.alt}
            width={thumbnail.image.width}
            height={thumbnail.image.height}
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
