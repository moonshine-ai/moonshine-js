import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
// import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: "src/offscreen.js",
    output: {
      file: "dist/offscreen.js",
      format: "iife",
      name: "UsefulMoonshine",
    },
    plugins: [nodeResolve({browser: false}), terser()]
  },
  {
    input: "src/service-worker.js",
    output: {
      file: "dist/service-worker.js",
      format: "iife",
      name: "UsefulMoonshine",
    },
    plugins: [nodeResolve({browser: false}), terser()]
  },
  {
    input: "src/overlay.js",
    output: {
      file: "dist/overlay.js",
      format: "iife",
      name: "UsefulMoonshine",
    },
    plugins: [nodeResolve({browser: false}), terser()]
  }
];
