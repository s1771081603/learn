import js from '@eslint/js'
import vuePlugin from 'eslint-plugin-vue'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import globals from 'globals'

export default [
  // 基础配置
  {
    ignores: ['dist/**', 'node_modules/**', '*.config.*']
  },

  // 全局变量配置
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },

  // JavaScript 推荐规则
  js.configs.recommended,

  // Vue 3 配置
  ...vuePlugin.configs['flat/recommended'],

  // TypeScript 配置
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      ...tseslint.configs.recommended.rules
    }
  },

  // Vue + TypeScript 配置
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vuePlugin.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: tsParser
      }
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': tseslint
    },
    rules: {
      ...vuePlugin.configs['flat/recommended'].rules,
      ...tseslint.configs.recommended.rules
    }
  },

  // Prettier 配置（必须放在最后）
  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error'
    }
  }
]
