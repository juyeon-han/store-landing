import { useLocation } from 'react-router-dom';

export const usePageParams = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const pageParams = Object.fromEntries(params.entries());

  return { pageParams };
};
