import {raycasterDisabled} from "./onCreated/raycasterDisabled";
import {raycasterBoundingBox} from "./onCreated/raycasterBoundingBox";
import {raycasterSimple} from "./onCreated/raycasterSimple";
import {shadowUpdatesDisabled} from "./onCreated/shadowUpdatesDisabled";
import {fitAll} from "./fitAll";
import {fitAll2} from "./fitAll2";
import {centerObj, centerObj2} from "./centerObj";
import {performanceAdjustments} from "./onCreated/performanceAdjustments";

/**
 * <Canvas onCreated={}> receives the RootState from r3f store after the canvas is first initialized (after <Suspense>)
 * - camera: should always be available (there is a default cam when no custom cam is provided and made default)
 * - size: should always be available
 * - scene: should always be available
 * - controls: only available when custom controls are provided as default
 * - ...
 * - adaptivePerformance: injected by CanvasHOC to throttle performance settings based on environment (extra testing for node)
 */
const handleCreated = ({
						   camera, size, scene, controls, raycaster, gl, performance,
						   extraProps: {adaptivePerformance, centerOnCreated} = {/* empty obj as fallback so deconstruction won't fail if extraProps is missing */}
					   }) => {
	/** 0. disable/optimize some stuff that cannot be added via constructor aka on the component */
	if (adaptivePerformance) {
		// TODO: throttle performance settings on old devices
		//performanceAdjustments(gl, performance)
	}
	//raycasterDisabled(raycaster)
	//raycasterBoundingBox(raycaster)
	//raycasterSimple(raycaster)

	//shadowUpdatesDisabled(gl)

	if (centerOnCreated) {
		/** 1. */ centerObj2(scene)
	}



	/** 2. */
	//fitAll(camera, size, scene, controls)
	fitAll2(camera, size, scene, controls)
}

export {handleCreated}
