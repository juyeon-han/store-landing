import { ErrorBoundary as ErrorBoundaryWrapper } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import ErrorFallback from '@/components/fallback/ErrorFallback';

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundaryWrapper
      resetKeys={[location.pathname]}
      onReset={reset}
      FallbackComponent={ErrorFallback}
    >
      {children}
    </ErrorBoundaryWrapper>
  );
};

export default ErrorBoundary;
