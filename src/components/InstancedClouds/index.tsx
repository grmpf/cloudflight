import { useMemo } from 'react'
import { Euler, Fog, InstancedMesh, LinearMipMapLinearFilter, MathUtils, Matrix4, PlaneBufferGeometry, Quaternion, Vector3 } from 'three'
import { useTexture } from '@react-three/drei'
import { FogBasicMaterial } from '../../webgl/material/FoggingMaterialClass'

const tmpPosition = new Vector3()
const tmpRotation = new Euler()
const tmpQuaternion = new Quaternion()
const tmpScale = new Vector3()
const tmpMatrix = new Matrix4()

// TODO: make a version with Object3D which would be much simpler
const randomizedMatrixPos = (i, matrix, count) => {
	// position
	//tmpPosition.x = Math.random() * 1000 - 500
	tmpPosition.x = Math.random() * (count / 4) - (count / 8)
	tmpPosition.y = -Math.random() * Math.random() * 200 - 15 // a range of 0 to 200, negated and made -215 to -15
	tmpPosition.z = i // currently 1 plane each unit

	// rotation
	tmpRotation.z = Math.random() * Math.PI
	tmpQuaternion.setFromEuler(tmpRotation)

	// scale
	tmpScale.x = tmpScale.y = Math.random() * Math.random() * 1.5 + 0.5

	matrix.compose(tmpPosition, tmpQuaternion, tmpScale)
}

const InstancedClouds = ({count = 4000}) => {
	//const cloudTexture = useTexture('/assets/textures/cloud256.png')
	const cloudTexture = useTexture('/assets/textures/cloud_mrdoob.png')
	if (!MathUtils.isPowerOfTwo(cloudTexture.image.width) || !MathUtils.isPowerOfTwo(cloudTexture.image.height)) {
		// a little reminder
		throw new Error('Width and height of texture image should be power of 2 to be fully compatible for MipMap.')
	}
	//cloudTexture.encoding = sRGBEncoding // gl.outputEncoding = 3001 aka THREE.sRGBEncoding
	//cloudTexture.encoding = LinearEncoding // gl.outputEncoding = 3000 aka THREE.LinearEncoding
	cloudTexture.magFilter = LinearMipMapLinearFilter // img should be power of 2 for MipMap
	cloudTexture.minFilter = LinearMipMapLinearFilter // img should be power of 2 for MipMap

	const [fog, geo] = useMemo(() => {
		return [
			new Fog(0x5299d1, -100, 3000),
			//new Fog(0x5299d1, -100, 2800),
			new PlaneBufferGeometry(64, 64)
		]
	}, [])

	const fogMaterial = useMemo(() => {
		return new FogBasicMaterial({
			map: cloudTexture,
			fog: fog,
		})
	}, [fog, cloudTexture])

	const [CloudInstMesh, CloudInstMeshClone] = useMemo(() => {
		const mesh = new InstancedMesh(
			geo,
			fogMaterial,
			count,
		)

		for (let i = 0; i < count; i++) {
			randomizedMatrixPos(i, tmpMatrix, count)
			mesh.setMatrixAt(i, tmpMatrix)
		}
		mesh.instanceMatrix.needsUpdate = true

		// an exact copy allows resetting position of the camera
		// this does not cover other objects beside the clouds so far (e.g. birds, planes or whales)
		const mesh2 = new InstancedMesh()
		mesh2.copy(mesh)

		return [mesh, mesh2]
	}, [count, geo, fogMaterial])

	return (
		<>
			<primitive raycast={null} object={CloudInstMesh} position-z={-count} />
			<primitive raycast={null} object={CloudInstMeshClone} />
		</>
	)
}

export {
	InstancedClouds
}
