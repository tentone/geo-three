import typescript from '@rollup/plugin-typescript';
export default [
	{
		input: 'source/examples/transition/transition.js',
		plugins: [
			typescript({
		 		declaration: false
			})
		],
		output: [
			{
				format: 'umd',
				file: 'example/transition.js',
				indent: '\t'
			}
		]
	},
	{
		input: 'source/examples/providers/providers.js',
		plugins: [
			typescript({
				declaration: false
			})
		],
		output: [
			{
				format: 'umd',
				file: 'example/providers.js',
				indent: '\t'
			}
		]
	}
];
