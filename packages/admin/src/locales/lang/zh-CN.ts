import { getLangMessage } from '../utils'

const modules = import.meta.globEager('./zh-CN/**/*.ts')
export default {
  message: {
    ...getLangMessage(modules, 'zh-CN')
  }
}
