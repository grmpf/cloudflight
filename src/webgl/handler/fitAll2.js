/**
 * this should be able to handle data from RootState via <Canvas onCreated={}> as well as manual calls
 * scene<Object3D> can be the actual <Scene> containing another Object3D like <group name="sceneContent"> or any Object3D
 *
 *
 * TODO: add PerspectiveCamera part
 *
 * NOTE:
 * This always uses the box (rectangular shape) around the given object(s) to calculate the max diagonal (aka 2*radius).
 * This works perfect for well aligned rectangular shapes but adds extra padding for shapes like spheres (imagine a sphere in a box - box-diagonal > sphere-diagonal)
 * Possible this could be calculated but
 */

import {Box3, Sphere, Vector3} from "three";

const TBox3 = new Box3()
const TSphere = new Sphere()
const TVector3 = new Vector3()

const adjustCamera = (camera, size, object3D, controls, padding = 30) => {
	// this is based on the container size - should be based on the camera I think
	// this works as long as camera is full width+height though

	//const padding = 60*2
	//const padding = 0

	if (camera && object3D?.children?.length > 0) {
		if (controls) {
			controls.enabled = false
			controls.reset()
		}
		if (camera.isPerspectiveCamera) {
			//if ( camera.type === 'PerspectiveCamera') {
			//console.log('isisisisis isPerspectiveCamera')
		} else if (camera.isOrthographicCamera) {
			//} else if ( camera.type === 'OrthographicCamera') {
			//console.log('isisisisis isOrthographicCamera')
			//defaults: near = 0.1, far = 2000

			//const TBox3 = useMemo(() => new Box3())
			//const TSphere = useMemo(() => new Sphere())
			//const TVector3 = useMemo(() => new Vector3())

			//console.log(camera, 'cameracamera')
			console.log([camera.top, camera.bottom, camera.left, camera.right], 'cameracamera tblr')
			console.log(camera.near, 'cameracamera n')
			console.log(camera.far, 'cameracamera f')
			console.log(camera.position, 'cameracamera p')

			//object3D.updateWorldMatrix(true, true);
			const aabb = TBox3.setFromObject(object3D)
			const aabbSphere = TSphere;
			aabb.getBoundingSphere(aabbSphere);
			const aabbRadius1 = aabbSphere.radius

			const aabbDiag = TVector3.subVectors(aabb.max, aabb.min);
			const aabbRadius2 = aabbDiag.length() * 0.5;

			const minScreenDim = Math.min(size.width, size.height)

			const minScreenDimP = minScreenDim - padding * 2
			const minScreenDimX = minScreenDimP < padding * 2 ? minScreenDim * 0.6 : minScreenDimP
			//console.log(minScreenDimX, 'minScreenDimXminScreenDimXminScreenDimX')

//			//const newZoom = Math.floor(Math.min(
//			//	((minScreenDimX) / (aabb.max.x - aabb.min.x)),
//			//	((minScreenDimX) / (aabb.max.y - aabb.min.y)),
//			//	((minScreenDimX) / (aabb.max.z - aabb.min.z))
//			//))
//			//const newZoom = Math.floor(minScreenDimX / (aabbRadius1 * 2))
//			//const newZoom = Math.floor(minScreenDimX / (aabbRadius2 * 2))
//			const newZoom = minScreenDimX / (aabbRadius2 * 2)
//
//			console.log(aabbRadius1, ' aabbSphere.radius aabbSphere.radius')
//			console.log(aabbRadius1 * 2, 'cameracamera r')
//			console.log(aabbRadius2 * 2, 'cameracamera r2')
//			console.log(aabbDiag, 'cameracamera aabbDiag')
//
//			camera.zoom = newZoom



			let calculatedViewSize = aabbRadius2 * 2 + aabbRadius2 * 0.15;
			calculatedViewSize = aabbRadius2 * 2;
			//at least 12 would be nice
			//let testViewSize = (calculatedViewSize < 12 ? 12 : calculatedViewSize);
			let testViewSize = calculatedViewSize

			console.log(testViewSize, 'farfarfar testViewSize')
			console.log([
				camera.left,
				camera.right,
				camera.top,
				camera.bottom,
				camera.near,
				camera.far,
			], 'farfarfar 1')
			var aspectRatio = size.width / size.height;
			camera.left = -(aspectRatio * testViewSize / 2);
			camera.right = (aspectRatio * testViewSize / 2);
			camera.top = testViewSize / 2;
			camera.bottom = -testViewSize / 2;
			camera.near = -(testViewSize / 2);
			camera.far = (1.5 * testViewSize);

			console.log(camera.up, 'farfarfar UPUPUP')

			camera.up.set( 0, 1, 0 );


			//camera.position.set( 0, -(testViewSize*1.0), (testViewSize/4) )
			////camera.position.set( 0, -(testViewSize*1.0), 0 )
			console.info(camera.position, 'camera.position')
			//camera.position.set( 0, -(testViewSize*1.0), 0 );
			camera.position.set(0, 0, (testViewSize * 1.0))
			console.info(camera.position, 'camera.position2')

			camera.lookAt(object3D.position);

			camera.updateProjectionMatrix();
			//camera.updateMatrixWorld(); // ???


			console.log([
				camera.left,
				camera.right,
				camera.top,
				camera.bottom,
				camera.near,
				camera.far,
			], 'farfarfar 2')
		}

		if (controls) {
			controls.update()
			controls.enabled = true
		}
	}
}

export {adjustCamera, adjustCamera as fitAll2}
