/*  eslint-env node */
import { createRequire } from 'node:module';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import postcssLit from 'rollup-plugin-postcss-lit';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve';
import image from '@rollup/plugin-image';
import { literalsHtmlCssMinifier } from '@literals/rollup-plugin-html-css-minifier';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const IS_DEV = process.env.ROLLUP_WATCH;

const serverOptions = {
  contentBase: ['./dist'],
  host: 'localhost',
  port: 5000,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
};

const REPLACEMENTS = {
    PKG_VERSION_VALUE: IS_DEV ? 'DEVELOPMENT' : pkg.version,
};

const plugins = [
  nodeResolve(),
  commonjs(),
  json(),
  replace({values: REPLACEMENTS, preventAssignment: true}),
  postcss({plugins: [postcssPresetEnv({stage: 1, features: {'nesting-rules': true}})], extract: false}),
  postcssLit(),
  image(),
  typescript(),
  !IS_DEV && literalsHtmlCssMinifier({}),
  !IS_DEV && terser({format: {comments: false}}),
  babel({babelHelpers: 'runtime', exclude: 'node_modules/**'}),
  IS_DEV && serve(serverOptions),
].filter(Boolean);

export default {
  input: 'src/trend-analysis-card.ts',
  output: {
    dir: 'dist',
    format: 'es',
    inlineDynamicImports: true
  },
  context: 'window',
  plugins
};
