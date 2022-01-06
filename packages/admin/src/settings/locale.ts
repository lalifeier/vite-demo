import { LocaleSetting, LocaleType } from '#/config';

export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: 'zh-CN',
  EN_US: 'en-US',
};

export const localeSetting: LocaleSetting = {
  locale: LOCALE.ZH_CN,

  fallback: LOCALE.ZH_CN,

  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US],
};

export const localeList = [
  {
    text: '简体中文',
    event: LOCALE.ZH_CN,
  },
  {
    text: 'English',
    event: LOCALE.EN_US,
  },
];
