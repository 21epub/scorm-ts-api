import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import eslint from '@rollup/plugin-eslint'

const extensions = ['.js', '.jsx', 'ts', 'tsx', '.mjs']

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        sourcemap: true,
        format: 'cjs',
      },
      {
        file: 'dist/index.mjs',
        sourcemap: true,
        format: 'es',
      },
    ],
    plugins: [
      eslint(),
      babel({
        extensions,
        babelHelpers: 'bundled',
      }),
      typescript({
        declaration: true,
        declarationDir: 'dist',
      }),
    ],
  },
]
