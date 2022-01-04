import { withInstall } from '@/utils/with-install'
import _Layout from './src/Layout'
import _LayoutContent from './src/LayoutContent'
import _LayoutFooter from './src/LayoutFooter'
import _LayoutHeader from './src/LayoutHeader'
import _LayoutSider from './src/LayoutSider'
import './style/index.scss'

export const Layout = withInstall(_Layout)
export const LayoutContent = withInstall(_LayoutContent)
export const LayoutFooter = withInstall(_LayoutFooter)
export const LayoutHeader = withInstall(_LayoutHeader)
export const LayoutSider = withInstall(_LayoutSider)

export default Layout
