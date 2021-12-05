import { withInstall } from "@/utils/with-install"
import tinymce from './src/tinymce'
import './style/index.scss'

export const Tinymce = withInstall(tinymce)

export default Tinymce
