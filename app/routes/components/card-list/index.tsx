import {Card, type CardProperties} from '../card';

export type CardListType = CardProperties[];

type Properties = {
  readonly posts: CardListType;
};

export function CardList({posts}: Properties) {
  return (
    <ul className="grid grid-flow-row gap-4 grid-cols-card-list">
      {posts.map((post) => (
        <li key={post.id}>
          <Card {...post} />
        </li>
      ))}
    </ul>
  );
}
