import dts from "rollup-plugin-dts";
import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: `src/index.ts`,
    plugins: [
      typescript({
        sourceMap: false,
      }),
    ],
    output: [
      {
        file: `dist/index.js`,
        format: "cjs",
        globals: {
          "bignumber.js": "BigNumber",
          yup: "yup",
        },
      },
      {
        file: `dist/index.umd.js`,
        name: "yupNumeric",
        format: "umd",
        sourcemap: false,
        exports: "named",
        globals: {
          "bignumber.js": "BigNumber",
          yup: "yup",
        },
      },
      {
        file: `dist/index.mjs`,
        format: "es",
        sourcemap: false,
        exports: "named",
        globals: {
          "bignumber.js": "BigNumber",
          yup: "yup",
        },
      },
    ],
    external: ["bignumber.js", "yup"],
  },
  {
    input: "src/index.ts",
    output: [
      {
        file: `dist/index.d.ts`,
        format: "es",
      },
    ],
    plugins: [dts()],
  },
];
