import serve from "rollup-plugin-serve";

export default {
	input: "source/Maps.js",
	plugins: [
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
			format: "umd",
			name: "Maps",
			file: "dist/maps.js",
			indent: "\t"
		}
	]
};
