// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import angular from "angular-eslint";

import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";

import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const eslintConfig = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      ...angular.configs.tsRecommended,
      eslintPluginPrettierRecommended,
    ],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          caughtErrors: "all",
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      /** Custom plugins */

      // Disable eslint sort-imports - it doesn't know how to fix imports
      "sort-imports": "off",

      // Enable simple-import-sort plugin to fix imports and exports order
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // to remove unused imports
      "unused-imports/no-unused-imports": "error",
    },
  },
  {
    files: ["**/*.spec.ts", "**/*.d.ts", "**/*.mock.ts"],
    rules: {
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  },
  // NOTE: we are not applying @angular-eslint/template in this override, only prettier
  {
    files: ["**/*.html"],
    ignores: ["*inline-template-*.component.html"],
    extends: [eslintPluginPrettierRecommended],
    rules: {
      // NOTE: we are overriding the default config to always set the parser to angular
      "prettier/prettier": ["error", { parser: "angular", endOfLine: "auto" }],
    },
  }
);

export default eslintConfig;
