/** es6 version of https://github.com/substack/defined/blob/master/index.js
 *
 * Returns first non-undefined value or undefined - unlike || chains, which return the first non-falsy value.
 *
 * USAGE:
 * import { definedOr } from './definedOr'
 * const opts = { y : false, w : 4 };
 * const x = definedOr(opts.x, opts.y, opts.w, 100);
 * console.log(x); // x == false
 */
const definedOr = (...args) => {
	const argLen = args.length;
	for (let i = 0; i < argLen; i++) {
		if (args[i] !== undefined) {
			return args[i];
		}
	}
}
export {definedOr}
