import { getLangMessage } from '../utils'

const modules = import.meta.globEager('./en/**/*.ts')
export default {
  message: {
    ...getLangMessage(modules, 'en')
  }
}
