import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-import-css";
import svg from "rollup-plugin-svg-import";

const plugins = [
    nodeResolve({ browser: true }),
    typescript(),
    svg({
      stringify: true
    }),
    css(),
    commonjs()
    // terser(),
];

export default [
    // core moonshine module
    {
        input: "src/index.ts",
        output: {
            file: "dist/moonshine.min.js",
            format: "es",
        },
        plugins: plugins,
    },
    // manual moonshine-ify from CDN
    {
        input: "src/manual.ts",
        output: {
            file: "dist/moonshine.manual.min.js",
            format: "iife",
            name: "UsefulMoonshine",
        },
        plugins: plugins,
    },
    // auto moonshine-ify from CDN
    {
        input: "src/auto.ts",
        output: {
            file: "dist/moonshine.auto.min.js",
            format: "iife",
            name: "UsefulMoonshine",
        },
        plugins: plugins,
    },
];
