export const replaceBackSlash = (str?: string): string => {
  const newStr = str?.replace(/\\/g, '') ?? '';
  return encodeURI(newStr);
};
