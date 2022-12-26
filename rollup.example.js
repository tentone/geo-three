import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';

export default [
	{
		input: 'source/examples/transition.ts',
		plugins: [
			resolve(),
			typescript({
		 		declaration: false
			})
		],
		output: [
			{
				format: 'iife',
				file: 'examples/transition.js',
				indent: '\t'
			}
		]
	},
	{
		input: 'source/examples/providers.ts',
		plugins: [
			resolve(),
			typescript({
				declaration: false
			})
		],
		output: [
			{
				format: 'iife',
				file: 'examples/providers.js',
				indent: '\t'
			}
		]
	}
];
