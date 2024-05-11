import {render} from '@testing-library/react';
import {createRemixStub} from '@remix-run/testing';
import {CardList} from '.';

const titleMock = 'タイトル';
const publishedAtMock = '2021-01-01';
const imageMock = {
  alt: '画像の説明',
  fieldId: '1',
  image: {
    width: 600,
    height: 600,
    url: 'https://example.com/image.jpg',
  },
};
const categoryMock = {
  id: '1',
  name: 'カテゴリ名',
};

describe('Card', () => {
  const RemixStub = createRemixStub([
    {
      path: '/',
      id: 'root',
      Component: () => (
        <CardList
          posts={[
            {
              id: '1',
              title: 'タイトル',
              publishedAt: '2021-01-01',
              images: [imageMock],
              category: categoryMock,
            },
          ]}
        />
      ),
    },
  ]);

  it('HTMLとスタイルが変わらないこと', async () => {
    const {asFragment} = render(<RemixStub initialEntries={['/']} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('postsで渡された配列の要素数だけリストのコンテンツが表示されること', () => {
    const {getByRole} = render(<RemixStub initialEntries={['/']} />);

    // Listの子要素が1件存在していることを確認
    expect(getByRole('list').children).toHaveLength(1);
  });
});
