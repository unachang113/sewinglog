import {render} from '@testing-library/react';
import {createRemixStub} from '@remix-run/testing';
import {Card} from '.';

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
        <Card
          id="1"
          title={titleMock}
          publishedAt={publishedAtMock}
          image={imageMock}
          category={categoryMock}
        />
      ),
    },
  ]);

  it('HTMLとスタイルが変わらないこと', async () => {
    const {asFragment} = render(<RemixStub initialEntries={['/']} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('linkのpathが/posts/{id}で指定されていること', () => {
    const {getByRole} = render(<RemixStub initialEntries={['/']} />);
    expect(getByRole('link')).toHaveAttribute('href', '/posts/1');
  });

  it('titleが表示されていること', () => {
    const {getByRole} = render(<RemixStub initialEntries={['/']} />);

    expect(getByRole('heading', {name: 'タイトル'})).toBeInTheDocument();
  });

  it('画像が表示されていること', () => {
    const {getByRole} = render(<RemixStub initialEntries={['/']} />);

    expect(getByRole('img')).toBeInTheDocument();
    expect(getByRole('img')).toHaveAttribute(
      'src',
      'https://example.com/image.jpg?w=600&h=600&q=80&dpx=3&fm=webp',
    );
  });

  it('投稿日時が表示されていること', () => {
    const {getByText} = render(<RemixStub initialEntries={['/']} />);

    expect(getByText('2021-01-01')).toBeInTheDocument();
  });

  it('categoryがPropsとして渡されている場合、カテゴリーが表示されていること', () => {
    const {getByText} = render(<RemixStub initialEntries={['/']} />);

    expect(getByText('カテゴリ名')).toBeInTheDocument();
  });

  it('categoryがPropsとして渡されていないない場合、カテゴリーが表示されないこと', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        id: 'root',
        Component: () => (
          <Card id="1" title={titleMock} publishedAt={publishedAtMock} image={imageMock} />
        ),
      },
    ]);

    const {queryByTestId} = render(<RemixStub initialEntries={['/']} />);
    expect(queryByTestId('category')).not.toBeInTheDocument();
  });
});
