import {render} from '@testing-library/react';
import {TimeText} from '.';

describe('TimeText', () => {
  it('HTMLとスタイルが変わらないこと', async () => {
    const {asFragment} = render(<TimeText dateTime="2021-01-01T00:00:00.000Z" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('投稿日時がYYYY.MM.DDの形式で表示されていること', () => {
    const {getByText} = render(<TimeText dateTime="2021-01-01T00:00:00.000Z" />);

    expect(getByText('2021.01.01')).toBeInTheDocument();
  });
});
