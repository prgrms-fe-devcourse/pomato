import { defineConfig, globalIgnores } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unicorn from "eslint-plugin-unicorn";
import configPrettier from "eslint-config-prettier";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default defineConfig([
  globalIgnores(["dist", "build", "coverage", "node_modules"]),

  ...compat.config({
    extends: ["plugin:@tanstack/query/recommended"],
  }),

  // App
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
        typescript: {
          project: ["./tsconfig.app.json", "./tsconfig.node.json"],
          alwaysTryTypes: true,
          noWarnOnMultipleProjects: true,
        },
        node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
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
      "import/no-unresolved": ["error", { ignore: ["^/"] }],
      "import/newline-after-import": "warn",
      "import/order": [
        "warn",
        {
          groups: [
            ["builtin", "external", "internal"],
            ["parent", "sibling", "index"],
          ],
          pathGroups: [
            {
              pattern:
                "@{assets,components,data,features,hooks,layout,pages,routes,services,stores,styles,tests,type,utils}/**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "unicorn/prefer-node-protocol": "off",
      "unicorn/no-null": "off",
      "unicorn/filename-case": [
        "error",
        { cases: { pascalCase: true, camelCase: true, kebabCase: true } },
      ],
      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/no-array-for-each": "off",
      "unicorn/prefer-at": "warn",
      "unicorn/explicit-length-check": "warn",
    },
  },

  // Main
  {
    files: ["src/main.tsx"],
    rules: {
      "unicorn/prefer-query-selector": "off",
    },
  },

  // Node
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
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.node.json",
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    extends: [js.configs.recommended],
    settings: {
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.app.json", "./tsconfig.node.json"],
          alwaysTryTypes: true,
          noWarnOnMultipleProjects: true,
        },
      },
    },
    rules: {
      "import/no-unresolved": "off",
      "import/order": "off",
      "unicorn/relative-url-style": "off",
      "unicorn/prefer-node-protocol": "off",
    },
  },

  configPrettier,
]);
