import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import strip from "@rollup/plugin-strip";
import copy from "rollup-plugin-copy";
import litcss from "rollup-plugin-lit-css";

export default {
  input: ["build/pwa-simulator.js"],
  output: {
    file: "dist/pwa-simulator.js",
    format: "es",
    sourcemap: false
  },
  plugins: [
    resolve(),
    replace({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "production"
      ),
      '../assets': 'https://github.com/pwa-builder/pwa-simulator/raw/main/assets',
      delimiters: ['', '']
    }),
    litcss(),
    terser(),
    strip({
      functions: ["console.log"],
    }),
    copy({
      targets: [
        { src: 'build/*.d.ts', dest: 'dist/' },
        { src: 'build/*.d.ts.map', dest: 'dist/' }
      ]
    })
  ]
};
