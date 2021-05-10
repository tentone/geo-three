import serve from 'rollup-plugin-serve';
import typescript from '@rollup/plugin-typescript';
import livereload from 'rollup-plugin-livereload';

export default {
	input: 'source/Main.ts',
	plugins: [
		typescript(),
		serve({
			open: true,
			contentBase: '.',
			verbose: true,
			openPage: '/',
			host: 'localhost',
			port: 8080
		}),
		livereload({watch: '.'})
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
