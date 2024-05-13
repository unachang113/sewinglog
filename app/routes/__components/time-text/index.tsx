import dayjs from 'dayjs';

type Properties = {
  readonly dateTime: string;
};

export function TimeText({dateTime}: Properties) {
  return (
    <time dateTime={dayjs(dateTime).format('YYYY-MM-DD')}>
      {dayjs(dateTime).format('YYYY.MM.DD')}
    </time>
  );
}
