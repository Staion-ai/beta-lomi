import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'

/**
 * Componente que muestra el indicador de progreso general del formulario
 */
const ProgressIndicator = ({ isStepComplete, activeStep, steps }) => {
    const completedSteps = [0, 1, 2].filter(step => isStepComplete(step)).length

    return (
        <Box sx={{
            marginTop: '1rem',
            textAlign: 'center',
            padding: '0.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
            <Typography variant="caption" sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '13px',
                fontWeight: 500
            }}>
                Progreso: {completedSteps}/3 etapas completadas
            </Typography>

            {activeStep === steps.length - 1 && (
                <FinalStepIndicator
                    allStepsComplete={completedSteps === 3}
                />
            )}
        </Box>
    )
}

ProgressIndicator.propTypes = {
    isStepComplete: PropTypes.func.isRequired,
    activeStep: PropTypes.number.isRequired,
    steps: PropTypes.array.isRequired
}

/**
 * Componente que muestra el indicador en el paso final
 */
const FinalStepIndicator = ({ allStepsComplete }) => {
    const messageColor = allStepsComplete ? '#4CAF50' : '#FF5722'
    const message = allStepsComplete
        ? '✅ Listo para enviar'
        : '⚠️ Revisa las etapas incompletas antes de enviar'

    return (
        <Typography variant="caption" sx={{
            display: 'block',
            color: messageColor,
            fontSize: '12px',
            marginTop: '4px',
            fontWeight: 600
        }}>
            {message}
        </Typography>
    )
}

FinalStepIndicator.propTypes = {
    allStepsComplete: PropTypes.bool.isRequired
}

export default ProgressIndicator
