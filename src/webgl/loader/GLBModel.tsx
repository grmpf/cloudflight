// based on: https://github.com/pmndrs/gltfjsx

import {
	Group as TGroup,
	BoxHelper as TBoxHelper,
} from 'three'
import {useEffect, useMemo, useRef} from 'react'
import {useAnimations, useGLTF, useHelper} from '@react-three/drei'
//import {GLTF} from 'three/examples/jsm/loaders/GLTFLoader'
//import {GLTF} from 'three-stdlib'
import {GLTF} from "three-stdlib/loaders/GLTFLoader";

import {VertexNormalsHelper} from 'three-stdlib'
import {useFrame, useThree} from "@react-three/fiber";
import {generateUUID} from 'three/src/math/MathUtils.js';

type GLTFResult = GLTF & {
	//nodes: {
	//	Penrose: THREE.Mesh
	//}
	nodes: {}, debug
	materials: {}
}

const GLBLoader = ({url, debug = false, ...rest}: JSX.IntrinsicElements['group']) => {
	const groupRef = useRef<TGroup>()
	const meshRef = useRef<TGroup>()

	useHelper(debug ? groupRef : {}, TBoxHelper, "cyan")

	const path = url || '/penrose2.glb?'
	const {scene, ...restXY} = useGLTF(path) as GLTFResult

	// TODO: use own components for geometry and material ???
	// TODO: how bad is <primitive object={obj} /> regarding auto-disposing ???

	useHelper(groupRef, TBoxHelper, "cyan")
	useHelper(meshRef, VertexNormalsHelper, 1, "magenta") // does this work?

	if (scene?.children) {
		const len = scene.children.length;
		if (len > 0) {

			return (
				<group ref={groupRef} {...rest} /*dispose={null}*/>
					{scene.children.map((mesh, i) => {
						return (
							//<mesh
							//	{...mesh}
							//	key={mesh.uuid || i}
							//	name={mesh.name || 'n/a'}
							//	castShadow
							//	receiveShadow
							//	position={len === 1 ? [0, 0, 0] : mesh.position} // center if only one - use postions otherwise
							//	userData={{
							//		name: mesh.userData?.name ? mesh.userData.name : (mesh.name || 'n/a')
							//	}}
							///>
							<mesh
								key={mesh.uuid || i}
								uuid={mesh.uuid}
								name={mesh.name || 'n/a'}
								castShadow
								receiveShadow
								geometry={mesh.geometry}
								material={mesh.material}
								//material-wireframe={true}
								//material-color={'hotpink'}
								position={len === 1 ? [0, 0, 0] : mesh.position} // center if only one - use postions otherwise
								//position={(i === 0) ? [35, 0, 0] : mesh.position} // TEEEEST
								userData={{name: mesh.userData?.name ? mesh.userData.name : (mesh.name || 'n/a')}}
							>
								{/*
								<bufferGeometry {...mesh.geometry} />
								<meshStandardMaterial {...mesh.material} />
								*/}
							</mesh>
						)
					})}
				</group>
			)
		}
	}

	return undefined
}



const GLBLoaderAnimated = ({url, speed, factor, position, debug = false, ...rest}: JSX.IntrinsicElements['group']) => {
	const speedA = speed || 1
	const factorA = factor || 1

	const groupRef = useRef<TGroup>()
	const meshRef = useRef<TGroup>()

	const path = url || '/penrose2.glb?'
	const {nodes, scene, animations} = useGLTF(path) as GLTFResult
	const { ref, mixer } = useAnimations(animations)

	useHelper(debug ? ref : {}, TBoxHelper, "cyan")

	//console.error(scene, 'meshesmeshesmeshesmeshesmeshes 1')
	//console.error(nodes, 'meshesmeshesmeshesmeshesmeshes 2')

	const invalidate3 = useThree(({invalidate}) => invalidate);
	const frameloop3 = useThree(({frameloop}) => frameloop);

	useEffect(() => {
		if(ref?.current && mixer && animations.length > 0) {
			mixer.clipAction(animations[0], ref.current).play()
		}
	}, [mixer, animations, ref])

	useFrame((state, delta) => {
		//if(ref?.current) {
		//	ref.current.rotation.y += Math.sin((delta * factorA) / 2) * Math.cos((delta * factorA) / 2) * 1.5
		//}
		if(mixer && animations.length > 0) {
			mixer.update(delta * speedA)

			if(frameloop3 === 'demand') {
				invalidate3()
			}
		}
	})

	// TODO: use own components for geometry and material ???
	// TODO: how bad is <primitive object={obj} /> regarding auto-disposing ???
	if (scene?.children) {
		const len = scene.children.length;
		if(len > 0) {
			//useHelper(ref, TBoxHelper, "springgreen")
			//useHelper(meshRef, VertexNormalsHelper, 1, "magenta") // does this work?

			return (
				<group ref={ref} position={position} dispose={null}>
					<>

						{/*
						{scene.children.map((mesh, i) => (
							<mesh
								key={mesh.uuid || i}
								uuid={mesh.uuid}
								name={mesh.name || 'n/a'}
								castShadow
								receiveShadow
								geometry={mesh.geometry}
								material={mesh.material}
								//morphTargetDictionary={mesh.morphTargetDictionary || null}
								//morphTargetInfluences={mesh.morphTargetInfluences || null}
								//material-wireframe={true}
								//material-color={'hotpink'}
								position={len === 1 ? [0, 0, 0] : mesh.position} // center if only one - use postions otherwise
								//position={(i === 0) ? [35, 0, 0] : mesh.position} // TEEEEST
								userData={{name: mesh.userData?.name ? mesh.userData.name : (mesh.name || 'n/a')}}
								{...rest}
							/>

						))}
						*/}

						{scene && <primitive
							key={'asdf'}
							object={scene}
							castShadow
							receiveShadow

							{...rest}
						>
							<meshStandardMaterial
								metalness={0.1}
								roughness={0.1}
								shininess={0.1}
							/>
						</primitive>}
					</>
				</group>
			)
		}
	}

	return undefined
}

export default GLBLoader
export {GLBLoader, GLBLoader as GLBModel, GLBLoaderAnimated}
