import { getLangMessage } from '../utils'

const modules = import.meta.globEager('./en-US/**/*.ts')
export default {
  message: {
    ...getLangMessage(modules, 'en-US'),
  },
}
