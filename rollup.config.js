const { babel } = require("@rollup/plugin-babel");
const image = require("@rollup/plugin-image");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const postcss = require("rollup-plugin-postcss");
const packageJson = require("./package.json");
const { generateScopedName } = require("./src/plugins/polarisNamingStrategy");

const externalPackages = [
  "react",
  "classnames",
  "react-autosize-textarea",
  "react-is",
  "prop-types",
  "object-assign",
];

const extensions = [".js", ".jsx", ".ts", ".tsx"];

module.exports = [
  {
    external: (id) =>
      externalPackages.includes(id) ||
      id.includes("react-aria") ||
      id.includes("react-stately"),
    input: "src/index.ts",
    plugins: [
      nodeResolve({ extensions }),
      babel({ babelHelpers: "bundled", extensions }),
      commonjs({
        namedExports: {
          "react/jsx-runtime": ["jsx", "jsxs", "Fragment"],
        },
      }),
      postcss({
        modules: {
          generateScopedName: generateScopedName({
            prefix: "Polarwind",
            extension: ".module.css",
          }),
        },
        extract: "polarwind.css",
        minimize: true,
      }),
      image(),
    ],
    output: [
      {
        file: packageJson.module,
        format: "esm",
      },
      {
        file: packageJson.main,
        format: "cjs",
      },
    ],
  },
];
