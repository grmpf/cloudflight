/**
 * this should be able to handle data from RootState via <Canvas onCreated={}> as well as manual calls
 * scene<Object3D> can be the actual <Scene> containing another Object3D like <group name="sceneContent"> or any Object3D
 *
 * TODO: FIX THIS LOGIC - code doesn't seem to do a good job
 * TODO: add PerspectiveCamera part
 *
 * NOTE:
 * This always uses the box (rectangular shape) around the given object(s) to calculate the max diagonal (aka 2*radius).
 * This works perfect for well aligned rectangular shapes but adds extra padding for shapes like spheres (imagine a sphere in a box - box-diagonal > sphere-diagonal)
 * Possible this could be calculated but
 */

import {useMemo} from "react";
import {Box3} from "three";

const TBox3 = new Box3()

const fitAll = (camera, size, scene, controls) => {
	//const cam = camera.current ? camera.current : camera
	const cam = camera.isCamera ? camera : camera.current
	const ctrls = controls.current ? controls.current : controls

	//const scene0 = scene.isScene ? scene : scene.current
	const scene0 = scene.current ? scene.current : scene
	const content = scene0.isScene ? scene0.getObjectByName("sceneContent") : scene0

	console.error(cam, 'cam')
	console.error(ctrls, 'ctrls')
	console.error(size, 'size')
	console.error(content, 'content')

	let needsUpdate = false

	if(cam && content?.children?.length > 0) {
		if(ctrls) {
			ctrls.enabled = false
		}

		if ( cam.isPerspectiveCamera ) {
		//if ( cam.type === 'PerspectiveCamera') {
			//console.log('isPerspectiveCamera')
		} else if ( cam.isOrthographicCamera ) {
		//} else if ( cam.type === 'OrthographicCamera') {
			//const TBox3 = useMemo(() => new Box3())

			const { min, max } = TBox3.setFromObject(content);
			const minDis = Math.sqrt(min.x ** 2 + min.y ** 2 + min.z ** 2);
			const maxDis = Math.sqrt(max.x ** 2 + max.y ** 2 + max.z ** 2);
			const radius = minDis > maxDis ? minDis : maxDis;
			const aspect = size.width / size.height;

			cam.lookAt(content.position);
			cam.zoom = aspect > 1 ? size.height / (radius * 2) : size.width / (radius * 2);
			cam.updateProjectionMatrix();
			needsUpdate = true
		}

		if(ctrls) {
			if (needsUpdate) {
				ctrls.update();
			}
			ctrls.enabled = true
		}
	} else {
		console.error('ZONK - no content or camera to fit into');
	}
}

export {fitAll}
