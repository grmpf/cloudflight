import { ShaderMaterial, Color, Texture,
	MeshBasicMaterial,
	MeshPhysicalMaterial,
	MeshStandardMaterial,
	MeshLambertMaterial,
	MeshPhongMaterial,
	MeshNormalMaterial,
} from 'three'
import {cloneUniforms} from "three/src/renderers/shaders/UniformsUtils";
import {ShaderLib} from "three/src/renderers/shaders/ShaderLib";



// Material should use scene.fog automatically but allows to inject custom fog affecting only this material
// This material fades out when close to camera
const nearFadeShaderChunk = `gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );`
class FogBasicMaterial extends MeshBasicMaterial {
	constructor(parameters) {
		super();

		this.transparent = true;
		this.fog = true;
		this.depthTest = false; // required for the right visual
		//this.depthWrite = false;

		const uniforms = {}

		if (this.defines === undefined) {
			this.defines = {}
		}

		// NOTES:
		// - USE_FOG + FOG_EXP2 are use to enable #ifdef sections which would need to be overwritten otherwise just to get their content
		// - Currently a fog [Fog | FogExp2] class or their values as single params are allowed
		// - Defaults
		if (parameters?.fog) {
			// A) in case fog is passed as a class [Fog | FogExp2] via "fog" param
			if (parameters.fog?.isFogExp2) {
				//isFogExp2
				this.defines.USE_FOG = ''; // is only set by default when scene.fog is available
				this.defines.FOG_EXP2 = ''; // is only set by default when scene.fog is FogExp2

				uniforms.fogColor = {value: parameters.fog.color}
				uniforms.fogDensity = {value: parameters.fog.density}

			} else if (parameters.fog?.isFog) {
				//isFog
				this.defines.USE_FOG = ''; // is only set by default when scene.fog is available

				uniforms.fogColor = {value: parameters.fog.color}
				uniforms.fogNear = {value: parameters.fog.near}
				uniforms.fogFar = {value: parameters.fog.far}
			}
		} else if (parameters?.fogColor) {
			// B) in case fog is passed as multiple params (fogColor,fogNear,fogFar) | (fogColor,fogDensity)
			if (parameters?.fogDensity) {
				//isFogExp2
				this.defines.USE_FOG = ''; // is only set by default when scene.fog is available
				this.defines.FOG_EXP2 = ''; // is only set by default when scene.fog is FogExp2

				uniforms.fogColor = {value: parameters.fogColor}
				uniforms.fogDensity = {value: parameters.fogDensity} // default: 0.00025
			} else {
				//isFog
				this.defines.USE_FOG = ''; // is only set by default when scene.fog is available

				uniforms.fogColor = {value: parameters.fogColor}
				uniforms.fogNear = {value: parameters?.fogNear || 1} // 1 = fallback value like Fog
				uniforms.fogFar = {value: parameters?.fogFar || 1000} // 1000 = fallback value like Fog (for shaders the default is actually 2000)
			}
		}

		// ADD EXTRA uniforms here (if not already present) or set new default values
		// NOTE: thinkgs like e.g. "map" might already be handled by the extended material
		//if(parameters?.map) {
		//	uniforms.map = {
		//		value: parameters?.map || null
		//		//value: new Texture()
		//	}
		//}

		this.onBeforeCompile = shader => {
			// Alt place to manipulate defines
			//shader.defines.USE_FOG = '';

			// apply uniforms
			if(shader?.uniforms !== undefined) {
				for (const uniformName in uniforms) {
					shader.uniforms[uniformName] = uniforms[uniformName];
				}
			} else {
				// unlikely to happen when extending a default material
				shader.uniforms = uniforms
			}

			//TODO: remove fog_vertex.glsl.js when vFogDepth is not used at all (just to hide the warning - which is actually a good warning and should now show on PRD afaik)

			// TODO:
			// - test different versions for side-effects
			// - test FogExp2 properly
			shader.fragmentShader = shader.fragmentShader
				// v3 - uses all defaults provided by three.js (vFogDepth, fogFactor, gl_FragColor)
//				.replace('#include <fog_fragment>',
//					`${nearFadeShaderChunk}
//					#include <fog_fragment>
//					`
//				)

				// v2.5 - overwrites vFogDepth (for FOG + FOG_EXP2)
//				.replace('#include <fog_vertex>',
//					`#ifdef USE_FOG
//						//vFogDepth = - mvPosition.z; // DEFAULT
//						vFogDepth = gl_FragCoord.z / gl_FragCoord.w;
//					#endif
//					`
//				)
//				.replace('#include <fog_fragment>',
//					`${nearFadeShaderChunk}
//					#include <fog_fragment>
//					`
//				)

				// v2.0 - closest to the original - own fogDepth for non-FOG_EXP2 (instead of vFogDepth)
				.replace('#include <fog_fragment>',
					`${nearFadeShaderChunk}

					#ifdef USE_FOG
						float depth = gl_FragCoord.z / gl_FragCoord.w;
						#ifdef FOG_EXP2
							//DEFAULT
							//float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );

							float fogFactor = 1.0 - exp( - fogDensity * fogDensity * depth * depth );
						#else
							//DEFAULT
							//float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );

							float fogFactor = smoothstep( fogNear, fogFar, depth );
						#endif

						//DEFAULT
						//gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );

						gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );
					#endif

					`
				)
		}

		// TODO?: remove some params
		this.setValues( parameters );
	}
}

export { FogBasicMaterial }

//needs "extend({ FoggingMaterialClass })" to use as "<foggingMaterialClass>"
