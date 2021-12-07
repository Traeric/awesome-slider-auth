import { join } from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import stylus from "rollup-plugin-stylus-compiler";
import css from "rollup-plugin-css-only";
import image from '@rollup/plugin-image';
import babel from '@rollup/plugin-babel';
import vue from 'rollup-plugin-vue';
import del from 'rollup-plugin-delete';


const baseOutput = format => ({
  format,
  file: `dist/index-${format}.js`
});

export default ({ format }) => {
  const output = format === 'esm' ? baseOutput(format) : {
    ...baseOutput(format),
    name: 'awesome-slider-auth',
    exports: 'named',
    globals: {
      vue: 'Vue'
    }
  }
  return {
    input: join(__dirname, 'packages/index.ts'),
    output,
    plugins: [
      del({ targets: [`dist/*-${format}.js`] }),
      terser(),
      nodeResolve(),
      stylus(),
      css({
        output: 'index.css',
      }),
      // 打包图片 不添加这个组件中引用的图片无法被打包
      image(),
      vue({
        target: 'browser',
        css: false,
        exposeFilename: false
      }),
      typescript(),
      babel({
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        babelHelpers: 'runtime',
        skipPreflightCheck: true
      })
    ],
    external(id) {
      return /^vue/.test(id);
    },
  }
}
