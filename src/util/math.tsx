const DEG2RAD = Math.PI / 180
const RAD2DEG = 180 / Math.PI

function degToRad( degrees ) {
	return degrees * DEG2RAD;
}

function radToDeg( radians ) {
	return radians * RAD2DEG;
}

function isPowerOfTwo( value ) {
	return ( value & ( value - 1 ) ) === 0 && value !== 0;
}

function ceilPowerOfTwo( value ) {
	return Math.pow( 2, Math.ceil( Math.log( value ) / Math.LN2 ) );
}

function floorPowerOfTwo( value ) {
	return Math.pow( 2, Math.floor( Math.log( value ) / Math.LN2 ) );
}


/**
 * USAGE:
 * const bool1 = isBetween(550, 500, 600) // true
 * const bool2 = isBetween(666, 500, 600) // false
 */
const isBetween = (num: number, min: number, max: number, inclMin = true, inclMax = true): boolean => {
	let a = min
	let b = max
	if (min > max) {
		a = max
		b = min
	}

	return (inclMin ? num >= a : num > a) && (inclMax ? num <= b : num < b);
}

/**
 * USAGE:
 * const val1 = limitBetween(666, 500, 600) // 600
 * const val2 = limitBetween(333, 500, 600) // 500
 */
const limitBetween = (num: number, min: number, max: number, inclMin = true, inclMax = true): number => {
	let val = num
	let a = min
	let b = max
	if (min > max) {
		a = max
		b = min
	}

	//if (inclMin && num >= a || !inclMin && num > a) {
	if (inclMin ? num >= a : num > a) { // does this work?
		val = a
	}
	//if (inclMax && num <= b || !inclMax && num < b) {
	if (inclMax ? num <= b : num < b) { // does this work?
		val = b
	}
	return val
}

export {
	DEG2RAD, RAD2DEG,
	degToRad, radToDeg,
	isPowerOfTwo, ceilPowerOfTwo, floorPowerOfTwo,
	isBetween, limitBetween,
}
