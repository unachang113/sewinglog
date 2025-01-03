import {Link} from 'react-router';
import {type MicroCMSContentId, type MicroCMSDate} from 'microcms-js-sdk';
import {type Category, type Image} from '../../../types/posts';
import {TimeText} from '../time-text';

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
    <article className="border-2 border-primary bg-white">
      <Link to={{pathname: `/posts/${id}`}}>
        <figure className="border-b-2 border-primary">
          <img
            src={`${thumbnail.image.url}${thumbnailParameters}`}
            alt={thumbnail.alt}
            width={thumbnail.image.width}
            height={thumbnail.image.height}
          />
        </figure>
        <div className="p-4">
          <h2 className="font-bold text-base mb-1 text-primary">{title}</h2>
          <div className="flex flex-wrap justify-between items-center">
            {publishedAt && (
              <span className="text-xs text-secondary">
                <TimeText dateTime={publishedAt} />
              </span>
            )}
            {category && (
              <span
                data-testid="category"
                className="text-xs rounded-full bg-secondary text-white px-2 py-1"
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
