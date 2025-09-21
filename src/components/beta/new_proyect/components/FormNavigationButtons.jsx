import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from '@mui/material'

/**
 * Componente que maneja los botones de navegación del formulario multi-paso
 */
const FormNavigationButtons = ({
    activeStep,
    steps,
    onBack,
    isStepComplete,
    isSubmitting = false,
    onShowErrors
}) => {
    const allStepsComplete = isStepComplete(0) && isStepComplete(1) && isStepComplete(2) && isStepComplete(3)
    const isLastStep = activeStep === steps.length - 1

    const getSubmitButtonConfig = () => {
        let buttonColor = '#F9DF88 !important'
        let buttonTextColor = '#41475D !important'
        let hoverColor = 'rgba(249, 223, 136, 0.9) !important'
        let buttonText = 'Siguiente'

        if (isLastStep) {
            if (allStepsComplete) {
                buttonColor = '#4CAF50 !important'
                hoverColor = '#388E3C !important'
                buttonText = '🚀 Finalizar y Enviar'
            } else {
                buttonColor = '#FF5722 !important'
                hoverColor = '#D84315 !important'
                buttonText = '⚠️ Revisar y Completar'
            }
            buttonTextColor = '#ffffff !important'
        }

        return { buttonColor, buttonTextColor, hoverColor, buttonText }
    }

    const { buttonColor, buttonTextColor, hoverColor, buttonText } = getSubmitButtonConfig()

    return (
        <Box className="form-actions">
            <BackButton
                disabled={activeStep === 0}
                onClick={onBack}
            />

            <SubmitButton
                buttonColor={buttonColor}
                buttonTextColor={buttonTextColor}
                hoverColor={hoverColor}
                buttonText={buttonText}
                isSubmitting={isSubmitting}
                disabled={!isStepComplete(activeStep)}
                onShowErrors={onShowErrors}
                isStepComplete={isStepComplete(activeStep)}
            />
        </Box>
    )
}

FormNavigationButtons.propTypes = {
    activeStep: PropTypes.number.isRequired,
    steps: PropTypes.array.isRequired,
    onBack: PropTypes.func.isRequired,
    isStepComplete: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool,
    onShowErrors: PropTypes.func
}

/**
 * Botón para retroceder al paso anterior
 */
const BackButton = ({ disabled, onClick }) => (
    <Button
        disabled={disabled}
        onClick={onClick}
        className="back-button"
        variant="outlined"
    >
        Anterior
    </Button>
)

BackButton.propTypes = {
    disabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}

/**
 * Botón principal de envío/siguiente
 */
const SubmitButton = ({
    buttonColor,
    buttonTextColor,
    hoverColor,
    buttonText,
    isSubmitting,
    disabled,
    onShowErrors,
    isStepComplete
}) => {
    const handleClick = (e) => {
        if (disabled && onShowErrors) {
            e.preventDefault()
            onShowErrors()
            return false
        }
    }

    return (
        <Button
            type="submit"
            className="submit-button"
            variant="contained"
            disabled={isSubmitting}
            onClick={handleClick}
            sx={{
                backgroundColor: buttonColor,
                color: buttonTextColor,
                '&:hover': {
                    backgroundColor: hoverColor
                },
                '&:disabled': {
                    opacity: 0.6
                },
                position: 'relative'
            }}
        >
            {isSubmitting ? 'Enviando...' : buttonText}
            {disabled && !isSubmitting && (
                <span style={{
                    position: 'absolute',
                    top: '-33px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '12px',
                    backgroundColor: '#fff',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid #ec1212ff',
                    color: '#ec1212ff',
                    whiteSpace: 'nowrap'
                }}>
                    ⚠️ Faltan campos por completar
                </span>
            )}
        </Button>
    )
}

SubmitButton.propTypes = {
    buttonColor: PropTypes.string.isRequired,
    buttonTextColor: PropTypes.string.isRequired,
    hoverColor: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    onShowErrors: PropTypes.func,
    isStepComplete: PropTypes.bool.isRequired
}

export default FormNavigationButtons
