import type { App } from 'vue';
import type { I18n, I18nOptions } from 'vue-i18n';
import { createI18n } from 'vue-i18n';
import { getLanguage, getMessage } from './utils';

async function createI18nOptions(): Promise<I18nOptions> {
  const locale = getLanguage()
  const message = await getMessage(locale)

  return {
    legacy: false,
    // globalInjection: true,
    locale,
    messages: {
      [locale]: message
    },
    // sync: true,
    // silentTranslationWarn: true,
    // missingWarn: false,
    // silentFallbackWarn: true,
  }
}

export let i18n: ReturnType<typeof createI18n>

export async function setupI18n(app: App) {
  const options = await createI18nOptions();
  i18n = createI18n(options) as I18n;
  app.use(i18n);
}
