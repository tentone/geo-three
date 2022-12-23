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
				file: 'example/transition.js',
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
				file: 'example/providers.js',
				indent: '\t'
			}
		]
	}
];
