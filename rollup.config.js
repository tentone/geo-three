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
			file: "build/geothree.js",
			indent: "\t"
		},
		{
			format: "es",
			file: "build/geothree.module.js",
			indent: "\t"
		}
	]
};
