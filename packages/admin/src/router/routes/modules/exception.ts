import { EXCEPTION_STATUS } from '@/enums/exception';
import { EXCEPTION_PAGE, LAYOUT } from '@/router/routes/constant';
import { AppRouteModule } from '../../types';

const exception: AppRouteModule = {
  path: '/exception',
  name: 'ExceptionPage',
  meta: {
    title: '异常页面',
  },
  component: LAYOUT,
  children: [
    {
      path: '403',
      name: '403',
      component: EXCEPTION_PAGE,
      meta: { title: '403' },
      props: {
        status: EXCEPTION_STATUS.NOT_ACCESS,
      },
    },
    {
      path: '404',
      name: '404',
      component: EXCEPTION_PAGE,
      meta: { title: '404' },
      props: {
        status: EXCEPTION_STATUS.NOT_FOUND,
      },
    },
    {
      path: '500',
      name: '500',
      component: EXCEPTION_PAGE,
      meta: { title: '500' },
      props: {
        status: EXCEPTION_STATUS.ERROR,
      },
    },
    {
      path: 'network-error',
      name: 'NetworkError',
      component: EXCEPTION_PAGE,
      meta: { title: '网络错误' },
      props: {
        status: EXCEPTION_STATUS.NETWORK_ERROR,
      },
    },
  ],
};

export default exception;
