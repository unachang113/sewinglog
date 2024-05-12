import dayjs from 'dayjs';

export function TimeText({dateTime}: {readonly dateTime: string}) {
  return (
    <time dateTime={dayjs(dateTime).format('YYYY-MM-DD')}>
      {dayjs(dateTime).format('YYYY.MM.DD')}
    </time>
  );
}
