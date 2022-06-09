/**
 * Disabled shadow updates - can be used when nothing changes that requires re-renderig shadows (e.g. static models + lights and only the camera rotates)
 * Only when there is a moving light this needs to be enabled
 *
 * @param raycaster
 */
const shadowUpdatesDisabled = ({gl: domElement}) => {
	if (domElement) {
		//shadows...
	}
}

export {shadowUpdatesDisabled}
