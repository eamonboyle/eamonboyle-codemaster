/**
 * Next.js 16 removed `next lint`; this uses the flat config from `eslint-config-next`.
 * Kept on ESLint 9.x: ESLint 10.2 + eslint-config-next currently hits a scope-manager bug.
 */
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const next = require("eslint-config-next");

const eslintConfig = [
  ...next,
  { ignores: ["src/generated/**"] },
];

export default eslintConfig;
