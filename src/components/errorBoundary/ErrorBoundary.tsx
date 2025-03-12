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
      FallbackComponent={({ error }) => (
        <ErrorFallback
          error={error}
          resetErrorBoundary={reset}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
    >
      {children}
    </ErrorBoundaryWrapper>
  );
};

export default ErrorBoundary;
