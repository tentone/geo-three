import typescript from '@rollup/plugin-typescript';
export default [
	{
		input: 'source/examples/transition.ts',
		plugins: [
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
