export const formatNumberWithCommas = (num: number): string => {
  return num.toLocaleString();
};

export const padNumber = (num: number, length: number = 2): string => {
  return num.toString().padStart(length, '0');
};
