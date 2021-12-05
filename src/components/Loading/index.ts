import { withInstall } from '@/utils/with-install'
import loading from './src/index'
import './style/index.scss'

export { createLoading } from './src/createLoading'
export { useLoading } from './src/useLoading'

export const Loading = withInstall(loading)

export default Loading
