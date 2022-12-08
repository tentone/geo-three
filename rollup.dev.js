import serve from 'rollup-plugin-serve';
import typescript from '@rollup/plugin-typescript';
import livereload from 'rollup-plugin-livereload';

export default {
	external: ['three'],
	input: 'source/Main.ts',
	plugins: [
		typescript({ tsconfig: './tsconfig.json' }),
		serve({
			open: true,
			contentBase: '.',
			verbose: true,
			openPage: '/examples/index.html',
			host: 'localhost',
			port: 8080
		}),
		livereload({watch: '.'})
	],
	output: [
		{
			globals: {three: 'THREE'},
			format: 'umd',
			name: 'Geo',
			file: 'build/geo-three.js',
			indent: '\t',
			sourcemap: true
		}
	]
};
