import fs from 'fs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

let pkg = JSON.parse(fs.readFileSync('./package.json', { encoding: 'utf-8' }));

export default {
	input: 'build/index.js',
	plugins: [
		babel({
			exclude: 'node_modules/**'
		}),
		terser()
	],
	output: [
		{
			file: pkg.module,
			format: 'es',
			sourcemap: true
		},
		{
			name: 'css2object',
			file: pkg.umd,
			format: 'umd',
			sourcemap: true
		}
	]
};
