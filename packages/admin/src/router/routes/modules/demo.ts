import { LAYOUT } from '@/router/routes/constant';
import { AppRouteModule } from '@/router/types';

export const demo: AppRouteModule = {
  path: '/demo',
  name: 'Demo',
  meta: {
    title: 'Demo',
  },
  component: LAYOUT,
  children: [
    {
      path: 'table',
      name: 'table',
      component: () => import('@/views/demo/table.vue'),
    },
    {
      path: 'lazy',
      name: 'lazy',
      component: () => import('@/views/demo/lazy.vue'),
    },
    {
      path: 'virtualScroll',
      name: 'virtualScroll',
      component: () => import('@/views/demo/virtualScroll.vue'),
    },
    {
      path: 'loading',
      name: 'loading',
      component: () => import('@/views/demo/loading.vue'),
    },
    {
      path: 'excel',
      name: 'excel',
      component: () => import('@/views/demo/excel.vue'),
    },
    {
      path: 'upload',
      name: 'upload',
      component: () => import('@/views/demo/upload.vue'),
    },
    {
      path: 'tinymce',
      name: 'tinymce',
      component: () => import('@/views/demo/tinymce.vue'),
    },
    {
      path: 'markdown',
      name: 'markdown',
      component: () => import('@/views/demo/markdown.vue'),
    },
    {
      path: 'video',
      name: 'video',
      component: () => import('@/views/demo/video.vue'),
    },
    {
      path: 'scrollbar',
      name: 'scrollbar',
      component: () => import('@/views/demo/scrollbar.vue'),
    },
  ],
};

export default demo;
