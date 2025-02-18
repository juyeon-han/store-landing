export const formatNumberWithCommas = (num: number): string => {
  return num.toLocaleString();
};

export const formatMinutesToHours = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0 && remainingMinutes > 0) {
    return `${hours}시간 ${remainingMinutes}분`;
  } else if (hours > 0) {
    return `${hours}시간`;
  } else {
    return `${remainingMinutes}분`;
  }
};
