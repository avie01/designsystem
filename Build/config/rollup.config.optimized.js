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
import analyze from 'rollup-plugin-analyzer';

const isProduction = process.env.NODE_ENV === 'production';

const config = [
  // Main bundle configuration
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: !isProduction,
        exports: 'named',
        interop: 'auto',
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: !isProduction,
        exports: 'named',
      },
      // UMD build for direct browser usage
      {
        file: 'dist/index.umd.js',
        format: 'umd',
        name: 'ODLComponentLibrary',
        sourcemap: !isProduction,
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          '@carbon/icons-react': 'CarbonIconsReact',
        },
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: ['.mjs', '.js', '.json', '.node', '.ts', '.tsx'],
        preferBuiltins: false,
        browser: true,
        // Enhanced tree-shaking
        exportConditions: ['es2015', 'module', 'import', 'default'],
      }),
      json(),
      image({
        include: '**/*.(png|jpg|jpeg|gif|svg)',
        limit: 8192, // Inline images smaller than 8KB
      }),
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
        // Optimize for better tree-shaking
        format: 'esm',
        splitting: true,
        platform: 'neutral',
        mainFields: ['module', 'main'],
        conditions: ['es2015', 'module'],
        loaders: {
          '.json': 'json',
          '.js': 'jsx',
          '.ts': 'tsx',
          '.tsx': 'tsx',
        },
      }),
      commonjs({
        include: /node_modules/,
        // Enhanced tree-shaking for CommonJS
        ignoreTryCatch: false,
        transformMixedEsModules: true,
      }),
      postcss({
        extract: 'styles.css',
        modules: {
          // Enhanced CSS modules configuration
          generateScopedName: isProduction 
            ? '[hash:base64:5]' 
            : '[name]__[local]___[hash:base64:5]',
        },
        use: ['sass'],
        minimize: isProduction,
        // PurgeCSS integration for unused CSS removal
        plugins: isProduction ? [
          require('@fullhuman/postcss-purgecss')({
            content: ['./src/**/*.{ts,tsx}'],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
            safelist: [
              // Preserve dynamic classes
              /^odl-/,
              /^accessibility-/,
              /^theme-/,
            ],
          })
        ] : [],
      }),
      // Enhanced terser configuration
      isProduction && terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
          // Advanced optimizations
          passes: 2,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
          unsafe_arrows: true,
          unsafe_comps: true,
          unsafe_methods: true,
          arguments: true,
          booleans_as_integers: true,
          hoist_funs: true,
          hoist_props: true,
          hoist_vars: true,
          if_return: true,
          join_vars: true,
          keep_fargs: false,
          loops: true,
          negate_iife: true,
          properties: true,
          reduce_funcs: true,
          reduce_vars: true,
          sequences: true,
          side_effects: true,
          switches: true,
          typeofs: true,
          unused: true,
        },
        format: {
          comments: false,
          ecma: 2020,
          safari10: false,
        },
        mangle: {
          properties: {
            regex: /^_/,
          },
        },
        module: true,
        toplevel: true,
      }),
      // Bundle analyzer
      visualizer({
        filename: 'dist/stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
        template: 'treemap', // Better visualization
      }),
      // Additional bundle analysis
      analyze({
        summaryOnly: true,
        limit: 20,
      }),
    ].filter(Boolean),
    external: [
      'react', 
      'react-dom',
      'react/jsx-runtime',
      // More granular Carbon Icons externalization
      /@carbon\/icons-react\/.*/, // Exclude specific icon imports
    ],
    // Enhanced tree-shaking configuration
    treeshake: {
      moduleSideEffects: (id) => {
        // Allow side effects for CSS imports and specific modules
        return id.endsWith('.css') || id.includes('styles/globals.css');
      },
      propertyReadSideEffects: false,
      tryCatchDeoptimization: false,
      // Advanced tree-shaking options
      annotations: true,
      correctVarValueBeforeDeclaration: true,
      manualPureFunctions: ['React.createElement', 'React.memo'],
      preset: 'smallest',
    },
    // Performance optimizations
    cache: true,
    preserveSymlinks: false,
    // Watch mode optimizations
    watch: {
      exclude: ['node_modules/**', 'dist/**'],
      include: ['src/**'],
      clearScreen: false,
    },
  },

  // Separate chunks for better caching
  {
    input: {
      'components': 'src/components/index.ts',
      'design-system': 'src/design-system/index.ts',
      'context': 'src/context/index.ts',
    },
    output: {
      dir: 'dist/chunks',
      format: 'esm',
      entryFileNames: '[name].js',
      chunkFileNames: '[name]-[hash].js',
      sourcemap: !isProduction,
    },
    plugins: [
      // Similar plugin configuration as above
      peerDepsExternal(),
      resolve({
        extensions: ['.mjs', '.js', '.json', '.node', '.ts', '.tsx'],
        preferBuiltins: false,
        browser: true,
      }),
      esbuild({
        include: /\.[jt]sx?$/,
        exclude: /node_modules/,
        sourceMap: !isProduction,
        minify: isProduction,
        target: 'es2020',
        jsx: 'transform',
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment',
      }),
    ],
    external: ['react', 'react-dom', '@carbon/icons-react'],
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
    },
  },

  // TypeScript declarations
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [
      dts({
        respectExternal: true,
        compilerOptions: {
          preserveSymlinks: false,
          // Optimize declaration generation
          removeComments: isProduction,
          stripInternal: isProduction,
        },
      })
    ],
    external: [/\.css$/, 'react', 'react-dom', '@carbon/icons-react'],
  },
];

export default config;