import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import json from '@rollup/plugin-json';
import image from '@rollup/plugin-image';
import esbuild from 'rollup-plugin-esbuild';
import terser from '@rollup/plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';

const isProduction = process.env.NODE_ENV === 'production';

const config = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: !isProduction,
        exports: 'named',
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: !isProduction,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: ['.mjs', '.js', '.json', '.node', '.ts', '.tsx'],
        preferBuiltins: false,
        browser: true
      }),
      json(),
      image(),
      esbuild({
        include: /\.[jt]sx?$/,
        exclude: /node_modules/,
        sourceMap: !isProduction,
        minify: isProduction,
        target: 'es2020',
        jsx: 'transform',
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment',
        tsconfig: './tsconfig.build.json',
        loaders: {
          '.json': 'json',
          '.js': 'jsx',
          '.ts': 'tsx',
          '.tsx': 'tsx',
        },
      }),
      commonjs(),
      postcss({
        extract: 'styles.css',
        modules: true,
        use: ['sass'],
        minimize: isProduction,
      }),
      isProduction && terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        format: {
          comments: false,
        },
      }),
      visualizer({
        filename: 'dist/stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
    ].filter(Boolean),
    external: [
      'react', 
      'react-dom',
      'react/jsx-runtime',
      '@carbon/icons-react',
    ],
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
    },
  },
  // TODO: Re-enable type declarations once TS errors in components are fixed
  // {
  //   input: 'src/index.ts',
  //   output: [{ file: 'dist/index.d.ts', format: 'esm' }],
  //   plugins: [
  //     dts({
  //       respectExternal: true,
  //       tsconfig: './tsconfig.build.json',
  //     })
  //   ],
  //   external: [/\.css$/, 'react', 'react-dom', '@carbon/icons-react'],
  // },
];

export default config;