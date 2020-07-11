import serve from "rollup-plugin-serve";


export default {
	input: "source/Main.js",
	plugins: [
		serve({
			open: true,
			contentBase: '.',
			openPage: '/examples',
			host: 'localhost',
			port: 8080
		})
	],
	globals: {
		"three": "THREE"
	},
	output: [
		{
			format: "umd",
			name: "Geo",
			file: "build/geo-three.js",
			indent: "\t"
		},
	]
};
