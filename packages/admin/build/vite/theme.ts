import type { Plugin } from 'vite';
import { viteThemePlugin } from 'vite-plugin-theme';

export function configThemePlugin(): Plugin[] {
  return viteThemePlugin({
    colorVariables: [],
  });
}
