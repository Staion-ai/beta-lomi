import React from 'react'
import PropTypes from 'prop-types'
import Stage1 from '../stages/stage_1/Stage1'
import Stage2 from '../stages/stage_2/Stage2'
import Stage3 from '../stages/stage_3/Stage3'
import Stage4 from '../stages/stage_4/Stage4'

/**
 * Componente que renderiza el contenido del paso actual
 */
const StageRenderer = ({ activeStep, updateStageFiles }) => {
    switch (activeStep) {
        case 0:
            return <Stage1 />
        case 1:
            return <Stage2 />
        case 2:
            return <Stage3 updateStageFiles={updateStageFiles} />
        case 3:
            return <Stage4 updateStageFiles={updateStageFiles} />
        default:
            return null
    }
}

StageRenderer.propTypes = {
    activeStep: PropTypes.number.isRequired,
    updateStageFiles: PropTypes.func
}

export default StageRenderer
