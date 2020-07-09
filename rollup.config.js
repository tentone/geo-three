import strip from "rollup-plugin-strip";

export default {
	input: "source/Maps.js",
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
			name: "Maps",
			file: "dist/maps.js",
			indent: "\t"
		},
		{
			format: "es",
			file: "dist/maps.module.js",
			indent: "\t"
		}
	]
};
