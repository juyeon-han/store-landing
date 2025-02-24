import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/scss/global.scss';
import App from './App.tsx';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser'); //Dynamic import하는 것이 눈에 띄였다.
  // return worker.start();
  return worker.start({
    onUnhandledRequest(req, print) {
      // Chrome 확장프로그램 요청 무시

      if (req.url.startsWith('chrome-extension://')) {
        return;
      }

      // 다른 허용할 도메인들
      const allowedDomains = [
        '/src/assets/images/',
        'https://cdn.jsdelivr.net',
        'https://images.unsplash.com',
        'https://plus.unsplash.com',
      ];

      if (allowedDomains.some((domain) => req.url.includes(domain))) {
        return;
      }

      // 허용되지 않은 요청에 대해서만 경고 출력
      print.warning();
    },
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
