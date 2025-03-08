import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';

const examples = ['transition', 'providers', 'basic', 'orthographic'];

export default examples.map(example => ({
	input: `source/examples/${example}.ts`,
	plugins: [
		resolve(),
		typescript({
			tsconfig: './tsconfig.examples.json',
		})
	],
	output: [
		{
			format: 'iife',
			file: `examples/${example}.js`,
			indent: '\t'
		}
	]
}));
