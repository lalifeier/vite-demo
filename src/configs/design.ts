import { ThemeMode } from '../enums/app'

export const prefixCls = 'vva-pro'

export const themeMode = ThemeMode.LIGHT

export const themeColor = '#0960bd'

export const THEME_COLOR_LIST: string[] = [
  '#409EFF',
  '#1890ff',
  '#304156',
  '#212121',
  '#11a983',
  '#13c2c2',
  '#6959CD',
  '#f5222d'
]

export const LIGHT_THEME = {
  dark: false,
  colors: {
    background: '#f2f5f8',
    surface: '#ffffff',
    primary: '#0096c7',
    secondary: '#2a4f66',
    accent: '#59bbbb',
    error: '#ef476f',
    info: '#2196f3',
    success: '#05c075',
    warning: '#ffd166'
  },
  variables: {}
}

export const DARK_THEME = {
  dark: true,
  colors: {
    background: '#05090c',
    surface: '#111b27',
    primary: '#0096c7',
    secondary: '#829099',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  variables: {}
}
