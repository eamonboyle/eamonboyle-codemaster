// `next lint` was removed in Next 16; pin ESLint 9 until eslint-config-next supports 10.
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const next = require("eslint-config-next");

const eslintConfig = [
  ...next,
  { ignores: ["src/generated/**"] },
];

export default eslintConfig;
