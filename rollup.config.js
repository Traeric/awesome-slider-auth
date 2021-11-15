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
import {readdir, existsSync, mkdirSync, statSync, copyFileSync} from "fs";


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
      del({ targets: [`dist/*-${format}.js`, 'dist/index.css', 'dist/fonts/'] }),
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
      }),
      readdir("./packages/theme-chalk/fonts", (err, files)=>{
          if (!err) {
            if (!existsSync(`./dist/`)) {
              mkdirSync(`./dist/`);
            }
            if (!existsSync(`./dist/fonts`)) {
              mkdirSync(`./dist/fonts`);
            }
            
            if (existsSync(`./dist/fonts`)) {
              //遍历原目录下的文件名
              files.forEach(item => {
                let item_path = join("./packages/theme-chalk/fonts", item);
                //获取原目录下所有文件的文件信息
                let temp = statSync(item_path);
                if (temp.isFile()) {
                    copyFileSync(item_path, join(`./dist/fonts`, item));
                }
              })
            }
          }
      })
    ],
    external(id) {
      return /^vue/.test(id);
    },
  }
}
