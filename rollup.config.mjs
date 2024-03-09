import dts from "rollup-plugin-dts";
import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: `src/main.ts`,
    plugins: [
      typescript({
        sourceMap: false,
      }),
    ],
    output: [
      {
        file: `lib/index.js`,
        format: "cjs",
        globals: {
          "bignumber.js": "BigNumber",
        },
      },
      {
        file: `lib/index.umd.js`,
        name: "yupNumeric",
        format: "umd",
        sourcemap: false,
        exports: "named",
        globals: {
          "bignumber.js": "BigNumber",
        },
      },
      {
        file: `lib/index.mjs`,
        format: "es",
        sourcemap: false,
        exports: "named",
        globals: {
          "bignumber.js": "BigNumber",
        },
      },
    ],
    external: ["bignumber.js", "yup"],
  },
  {
    input: "src/main.ts",
    output: [
      {
        file: `lib/index.d.ts`,
        format: "es",
      },
    ],
    plugins: [dts()],
  },
];
