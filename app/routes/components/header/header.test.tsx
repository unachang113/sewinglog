import {render} from '@testing-library/react';
import {Header} from '.';

describe('Header', () => {
  it('HTMLとスタイルが変わらないこと', async () => {
    const {asFragment} = render(<Header />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('Sewing logというタイトルが表示されていること', () => {
    const {getByRole} = render(<Header />);

    expect(getByRole('heading', {level: 1, name: 'Sewing log'})).toBeInTheDocument();
  });
});
