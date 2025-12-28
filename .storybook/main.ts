import type { StorybookConfig } from '@storybook/react-webpack5';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-webpack5-compiler-swc',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    // Find and modify CSS rule
    const cssRule = config.module.rules.find(
      (rule: any) => rule.test && rule.test.toString().includes('css')
    );

    if (cssRule && typeof cssRule === 'object' && 'use' in cssRule) {
      const loaders = Array.isArray(cssRule.use) ? cssRule.use : [cssRule.use];

      // Add postcss-loader if not exists
      const hasPostcss = loaders.some((loader: any) =>
        typeof loader === 'object' && loader.loader && loader.loader.includes('postcss')
      );

      if (!hasPostcss) {
        loaders.push({
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                tailwindcss,
                autoprefixer,
              ],
            },
          },
        });
      }

      cssRule.use = loaders;
    }

    return config;
  },
};

export default config;
