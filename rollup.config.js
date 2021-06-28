import typescript from '@rollup/plugin-typescript'

export default [
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist',
      sourcemap: true,
      format: 'cjs',
    },
    watch: {
      include: 'src/**',
      exclude: 'node_modules/**',
    },
    plugins: [
      typescript({
        declaration: true,
        declarationDir: 'dist',
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.mjs',
      sourcemap: true,
      format: 'esm',
    },
    watch: {
      include: 'src/**',
      exclude: 'node_modules/**',
    },
    plugins: [typescript()],
  },
]
