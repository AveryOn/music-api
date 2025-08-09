import { readFileSync } from 'node:fs';
import { build } from 'esbuild';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const deps = Object.keys(pkg.dependencies || {});

// всё внешнее — не пакуем
const external = [
  ...deps,
  'node:*', 'fs', 'path', 'os', 'url', 'crypto'
];

await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'esm',
  outfile: 'dist/index.js',
  minify: true,
  sourcemap: false,
  legalComments: 'none',
  external,
});