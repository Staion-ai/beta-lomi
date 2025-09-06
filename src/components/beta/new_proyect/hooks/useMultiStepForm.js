/**
 * Hook personalizado para manejar la lógica del formulario multi-paso
 */
import { useState } from 'react'
import { useFormValidation } from './useFormValidation'

export const useMultiStepForm = (steps) => {
    const [activeStep, setActiveStep] = useState(0)
    const [formData, setFormData] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        validateCurrentStep,
        validateAllSteps,
        isStepComplete,
        showValidationErrors
    } = useFormValidation()

    // Función para manejar el envío del formulario
    const handleSubmit = async (data) => {
        setIsSubmitting(true)

        try {
            if (activeStep === steps.length - 1) {
                // Validar todos los pasos antes del envío final
                const allErrors = validateAllSteps(data)
                if (allErrors.length > 0) {
                    const errorMessage = "Por favor, completa todos los campos requeridos:\n\n" +
                        allErrors.map(error => `• ${error}`).join('\n')
                    alert(errorMessage)
                    return
                }

                // Envío final del formulario
                const updatedData = { ...formData, ...data }
                setFormData(updatedData)
                console.log('Form submitted:', updatedData)
                alert('¡Formulario enviado exitosamente!')
                return
            }

            // Validar paso actual
            const currentStepErrors = validateCurrentStep(activeStep, data)
            if (showValidationErrors(currentStepErrors)) {
                return
            }

            // Avanzar al siguiente paso
            const updatedData = { ...formData, ...data }
            setFormData(updatedData)
            setActiveStep(activeStep + 1)
        } finally {
            setIsSubmitting(false)
        }
    }

    // Función para retroceder al paso anterior
    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1)
        }
    }

    // Función para verificar si un paso está completo
    const checkStepComplete = (stepIndex, currentData) => {
        const combinedData = { ...formData, ...currentData }
        return isStepComplete(stepIndex, combinedData)
    }

    return {
        activeStep,
        formData,
        isSubmitting,
        handleSubmit,
        handleBack,
        checkStepComplete,
        setActiveStep,
        setFormData
    }
}
