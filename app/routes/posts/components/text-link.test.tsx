import {render} from '@testing-library/react';
import {TextLink} from './text-link';

describe('TextLink', () => {
  it('HTMLとスタイルが変わらないこと', () => {
    // テストの実装
    const {asFragment} = render(<TextLink path="https://example.com" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('pathで指定したURLがhref属性に設定されること', () => {
    const {getByRole} = render(<TextLink path="https://example.com" />);

    const link = getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});
