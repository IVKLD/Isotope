import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig(
  {
    ignores: ['dist/**', '.angular/**', 'node_modules/**', 'apps/api/src/database/migrations/**']
  },
  // Angular Frontend
  {
    files: ['apps/portfolio/src/**/*.ts'],
    extends: [...tseslint.configs.recommended, ...angular.configs.tsRecommended, prettierConfig],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: ['app', 'svg'],
          style: 'kebab-case'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: ['element', 'attribute'],
          prefix: ['app', 'svg'],
          style: 'kebab-case'
        }
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'no-public'
          }
        }
      ]
    }
  },
  // Backend & Contracts (NestJS + Shared)
  {
    files: ['apps/api/**/*.ts', 'libs/**/*.ts'],
    extends: [...tseslint.configs.recommended, prettierConfig],
    rules: {
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'no-public'
          }
        }
      ]
    }
  },
  // Angular Templates
  {
    files: ['apps/portfolio/src/**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
      prettierConfig
    ],
    rules: {
      '@angular-eslint/template/click-events-have-key-events': 'off',
      '@angular-eslint/template/interactive-supports-focus': 'off'
    }
  }
);
