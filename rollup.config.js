import strip from "rollup-plugin-strip";

export default {
	input: "source/Main.js",
	plugins: [
		strip(
		{
			functions: ["assert.*", "debug", "alert"],
			debugger: false,
			sourceMap: false
		})
	],
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
