import { http, HttpResponse } from 'msw';
import { dummy } from '@/mocks/dummy';

export const handlers = [
  http.get('/api/service_category', () => {
    return HttpResponse.json(dummy.service_category);
  }),
];
