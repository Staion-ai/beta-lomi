import React from 'react'
import PropTypes from 'prop-types'
import {
    Stepper,
    Step,
    StepLabel,
    Box,
    Typography
} from '@mui/material'
import ProgressIndicator from './ProgressIndicator'

/**
 * Componente personalizado del Stepper con indicadores de progreso
 */
const CustomStepper = ({
    activeStep,
    steps,
    isStepComplete
}) => {
    return (
        <Box className="stepper-container">
            <Stepper activeStep={activeStep} alternativeLabel className="custom-stepper">
                {steps.map((label, index) => {
                    const isCompleted = isStepComplete(index)
                    const isActive = activeStep === index

                    let labelColor = 'rgba(255, 255, 255, 0.6) !important'
                    if (isCompleted || isActive) {
                        labelColor = '#F9DF88 !important'
                    }

                    return (
                        <Step key={label} completed={isCompleted && index < activeStep}>
                            <StepLabel
                                className={`custom-step-label ${isActive ? 'Mui-active' : ''} ${isCompleted ? 'Mui-completed' : ''}`}
                                sx={{
                                    '& .MuiStepLabel-label': {
                                        color: labelColor
                                    }
                                }}
                            >
                                {label}
                                {isCompleted && index < activeStep && (
                                    <CompletionBadge />
                                )}
                            </StepLabel>
                        </Step>
                    )
                })}
            </Stepper>

            <ProgressIndicator
                isStepComplete={isStepComplete}
                activeStep={activeStep}
                steps={steps}
            />
        </Box>
    )
}

CustomStepper.propTypes = {
    activeStep: PropTypes.number.isRequired,
    steps: PropTypes.array.isRequired,
    isStepComplete: PropTypes.func.isRequired
}

/**
 * Badge que indica que un paso está completado
 */
const CompletionBadge = () => (
    <Typography variant="caption" sx={{
        display: 'block',
        color: '#4CAF50',
        fontSize: '11px',
        marginTop: '2px'
    }}>
        ✓ Completo
    </Typography>
)

export default CustomStepper
