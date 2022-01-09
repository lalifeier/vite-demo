import { withInstall } from '@/utils/with-install';
import _Layout from './src/Layout';
import _ProLayoutSiderTrigger from './src/LayoutSiderTrigger';
import './style/index.scss';

export const ProLayout = withInstall(_Layout);

export const ProLayoutSiderTrigger = withInstall(_ProLayoutSiderTrigger);

export default ProLayout;
