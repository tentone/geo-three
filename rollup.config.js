import strip from '@rollup/plugin-strip';
import {uglify} from "rollup-plugin-uglify";

export default {
	input: "source/Main.js",
	plugins: [
		strip(
		{
			functions: ["assert.*", "debug", "alert"],
			debugger: false,
			sourceMap: false
		}),
		uglify()
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
		{
			format: "es",
			file: "build/geo-three.module.js",
			indent: "\t"
		}
	]
};
