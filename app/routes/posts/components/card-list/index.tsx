import {Card, type Category, type Image} from '../card';

type Properties = {
  readonly posts: Array<{
    readonly title: string;
    readonly publishedAt: string;
    readonly images: Image[];
    readonly id: string;
    readonly category?: Category;
  }>;
};

export function CardList({posts}: Properties) {
  return (
    <ul className="grid grid-flow-row gap-4 grid-cols-card-list">
      {posts.map((post) => (
        <li key={post.id}>
          <Card
            id={post.id}
            title={post.title}
            publishedAt={post.publishedAt}
            image={post.images[0]}
            category={post.category}
          />
        </li>
      ))}
    </ul>
  );
}
