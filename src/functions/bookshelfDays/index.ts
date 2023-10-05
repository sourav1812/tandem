export default function (createdAt: Date): string {
  const now = new Date();
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

  if (isSameDay(createdAt, now)) {
    return 'TODAY';
  } else if (
    isSameDay(createdAt, new Date(now.getTime() - oneDayInMilliseconds))
  ) {
    return 'YESTERDAY';
  } else if (isSameWeek(createdAt, now)) {
    return 'THIS_WEEK';
  } else if (
    isSameWeek(createdAt, new Date(now.getTime() - 7 * oneDayInMilliseconds))
  ) {
    return 'LAST_WEEK';
  } else {
    const months = [
      'JANUARY',
      'FEBRUARY',
      'MARCH',
      'APRIL',
      'MAY',
      'JUNE',
      'JULY',
      'AUGUST',
      'SEPTEMBER',
      'OCTOBER',
      'NOVEMBER',
      'DECEMBER',
    ];

    return months[createdAt.getMonth()];
  }
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isSameWeek(date1: Date, date2: Date): boolean {
  const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  const diff = date1.getTime() - date2.getTime();
  return Math.abs(diff) < oneWeekInMilliseconds;
}
