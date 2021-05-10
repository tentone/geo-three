import serve from 'rollup-plugin-serve';
import typescript from '@rollup/plugin-typescript';

export default {
	input: 'source/Main.ts',
	plugins: [
		typescript(),
		serve({
			open: true,
			contentBase: '.',
			openPage: '/examples',
			host: 'localhost',
			port: 8080
		})
	],
	output: [
		{
			globals: { three: 'THREE' },
			format: 'umd',
			name: 'Geo',
			file: 'build/geo-three.js',
			indent: '\t'
		}
	]
};
