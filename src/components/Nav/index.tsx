import stylesHelpers from '../../styles/helpers.module.scss'
import NavStyles from '../../styles/component/Nav.module.scss'
import Image from 'next/image'
import { FaInfo } from 'react-icons/fa'

function TopCenter() {
	return (
		<div className={`${NavStyles.infoBoxTopCenter} ${stylesHelpers.notSelectable}`}>
			<div>
				Interactive Background
				<div>
					&ndash;&nbsp; <b>Cloud-Flight</b> &nbsp;&ndash;
				</div>
			</div>
			<div className={NavStyles.infoBoxTopCenterFooter}>
				WORK IN PROGRESS
			</div>
		</div>
	)
}

const BottomLeft = ({ githubUrl = 'https://github.com/grmpf' }) => {
	//return null

	return (
		<div className={`${NavStyles.boxLeft} ${stylesHelpers.notSelectable}`}>
			<div className={NavStyles.row} style={{
				//TODO: fix / figure out next.js images (incl. with unknown size)
				position: 'relative', bottom: '-6px'
			}}>
				<a className={'block'} href={githubUrl} target="_blank" rel="noopener noreferrer">
					<Image title={'A little homage to\n"The Hitchhiker\'s Guide to the Galaxy"\nby Douglas Adams'} src={'/assets/img/dont-panic-trans.png'} width='45' height='64' alt={'Don\'t panic'} />
				</a>
			</div>
		</div>
	)
}
const BottomRight = ({ githubUrl = 'https://github.com/grmpf' }) => {
	return (
		<div className={`${NavStyles.boxRight} ${stylesHelpers.notSelectable}`}>
			<div className={NavStyles.row}>
				<div>
					<a href={githubUrl} target="_blank" rel="noopener noreferrer">
						<FaInfo />
					</a>
				</div>
			</div>
		</div>
	)
}

export { TopCenter, BottomLeft, BottomRight }
