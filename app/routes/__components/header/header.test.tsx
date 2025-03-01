import {render} from '@testing-library/react';
import {createRoutesStub} from 'react-router';
import {Header} from '.';

describe('Header', () => {
  const RemixStub = createRoutesStub([
    {
      path: '/',
      id: 'posts',
      Component: () => <Header />,
    },
  ]);

  it('HTMLとスタイルが変わらないこと', async () => {
    const {asFragment} = render(<RemixStub />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('Sewing logというタイトルが表示されていること', () => {
    const {getByRole} = render(<RemixStub />);

    expect(getByRole('heading', {level: 1, name: 'Sewing log'})).toBeInTheDocument();
  });

  it('linkのpathが/で指定されていること', () => {
    const {getByRole} = render(<RemixStub initialEntries={['/']} />);
    expect(getByRole('link')).toHaveAttribute('href', '/');
  });
});
