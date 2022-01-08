import Banner from 'vite-plugin-banner';
import pkg from '../../package.json';

export function configBannerPlugin() {
  return Banner(
    `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * email: ${pkg.email}\n * homepage: ${pkg.homepage}\n */`,
  );
}
