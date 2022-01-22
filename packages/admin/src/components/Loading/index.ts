import { withInstall } from '@/utils/with-install'
import _Loading from './src/index'
import './style/index.scss'

export { createLoading } from './src/createLoading'
export { useLoading } from './src/useLoading'

export const Loading = withInstall(_Loading)

export default Loading
