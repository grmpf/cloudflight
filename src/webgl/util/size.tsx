
const visibleHeightAtZDepth = (depth, camera) => {
	// compensate for cameras not positioned at z=0
	const cameraOffset = camera.position.z

	/* ??? */
	if (depth < cameraOffset) {
		depth -= cameraOffset
	} else {
		depth += cameraOffset
	}

	// vertical fov in radians
	const vFOV = camera.fov * Math.PI / 180

	// Math.abs to ensure the result is always positive
	return 2 * Math.tan(vFOV / 2) * Math.abs(depth)
}
const visibleHeightAtZDepth2 = (camera, depth) => {
	depth = depth || camera.far

	// vertical fov in radians
	const vFOV = camera.fov * Math.PI / 180

	return 2 * Math.tan(vFOV / 2) * depth
}
const visibleHeightAtZDepthXY = (camera) => {
	// compensate for cameras not positioned at z=0
	const cameraOffset = camera.position.z

	let depth = camera.far
	/* doesn't really work*/
	//if (depth < cameraOffset) {
	//	depth -= cameraOffset;
	//} else {
	//	depth += cameraOffset;
	//}
	//depth = Math.abs(depth) // Math.abs to ensure the result is always positive

	//if(cameraOffset > 0) {
	//	depth -= cameraOffset;
	//} else {
	//	depth += cameraOffset;
	//}
	//depth = Math.abs(depth) // Math.abs to ensure the result is always positive

	// vertical fov in radians
	const vFOV = camera.fov * Math.PI / 180

	// Math.abs to ensure the result is always positive
	return 2 * Math.tan(vFOV / 2) * depth
}
const visibleWidthAtZDepth = (depth, camera) => {
	const height = visibleHeightAtZDepth(depth, camera)
	return height * camera.aspect
}
const visibleWidthAtZDepth2 = (camera, depth) => {
	const height = visibleHeightAtZDepth2(camera, depth)
	return height * camera.aspect
}


export {
	visibleHeightAtZDepth, visibleHeightAtZDepth2, visibleHeightAtZDepthXY,
	visibleWidthAtZDepth, visibleWidthAtZDepth2
}
