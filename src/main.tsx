import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/styles/scss/global.scss';
import SuspenseFallback from '@/components/fallback/SuspenseFallback.tsx';
import GlobalContextContainer from '@/context/GlobalContext.tsx';
import router from '@/routes/index.tsx';

// async function enableMocking() {
//   if (process.env.NODE_ENV !== 'development') {
//     return;
//   }

//   const { worker } = await import('./mocks/browser'); //Dynamic import하는 것이 눈에 띄였다.
//   // return worker.start();
//   return worker.start({
//     onUnhandledRequest(req, print) {
//       // Chrome 확장프로그램 요청 무시

//       if (req.url.startsWith('chrome-extension://')) {
//         return;
//       }

//       // 다른 허용할 도메인들
//       const allowedDomains = [
//         '/src/assets/images/',
//         'https://cdn.jsdelivr.net',
//         'https://images.unsplash.com',
//         'https://plus.unsplash.com',
//       ];

//       if (allowedDomains.some((domain) => req.url.includes(domain))) {
//         return;
//       }

//       // 허용되지 않은 요청에 대해서만 경고 출력
//       print.warning();
//     },
//   });
// }

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      throwOnError: true,
      staleTime: 1000 * 60 * 60 * 24, // 24시간
    },
    mutations: {
      throwOnError: false,
      onError: (error) => {
        console.log(error);
      },
    },
  },
});

// enableMocking().then(() => {
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalContextContainer>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<SuspenseFallback />}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </GlobalContextContainer>
  </StrictMode>
);
// });
