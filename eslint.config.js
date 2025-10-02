import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unicorn from "eslint-plugin-unicorn";
import configPrettier from "eslint-config-prettier";

export default defineConfig([
  globalIgnores(["dist", "build", "coverage", "node_modules"]),

  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      unicorn.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.es2024,
      },
    },
    settings: {
      "import/resolver": {
        typescript: { project: true, alwaysTryTypes: true },
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports" }],
      "no-undef": "off",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "import/no-unresolved": "error",
      "import/newline-after-import": "warn",
      "import/order": [
        "warn",
        {
          groups: [
            ["builtin", "external", "internal"],
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "unicorn/prefer-node-protocol": "off",
      "unicorn/no-null": "off",
      "unicorn/filename-case": ["error", { cases: { pascalCase: true, camelCase: true } }],
      "unicorn/prevent-abbreviations": "off",
    },
  },

  {
    files: [
      "vite.config.{ts,js,mts,cts}",
      "eslint.config.{js,ts,mjs,cjs}",
      "tailwind.config.{js,ts,mjs,cjs}",
      "scripts/**/*.{ts,js,mts,cts}",
      "*.config.{ts,js,mts,cts}",
    ],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    extends: [js.configs.recommended],
    rules: {
      "import/no-unresolved": "off",
      "import/order": "off",
      "unicorn/relative-url-style": "off",
      "unicorn/prefer-node-protocol": "off",
    },
  },

  configPrettier,
]);
