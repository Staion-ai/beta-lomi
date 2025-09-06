/**
 * Hook personalizado para manejar la lógica del formulario multi-paso
 */
import { useState } from 'react'
import { useFormValidation } from './useFormValidation'

export const useMultiStepForm = (steps) => {
    const [activeStep, setActiveStep] = useState(0)
    const [formData, setFormData] = useState({})
    const [filesData, setFilesData] = useState({
        stage2: {}, // Para archivos de productos
        stage3: {}  // Para archivos de testimoniales
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        validateCurrentStep,
        validateAllSteps,
        isStepComplete,
        showValidationErrors
    } = useFormValidation()

    // Función para actualizar archivos por stage
    const updateStageFiles = (stage, fileKey, file) => {
        setFilesData(prev => ({
            ...prev,
            [stage]: {
                ...prev[stage],
                [fileKey]: file
            }
        }))
    }

    // Función para consolidar todos los datos en FormData
    const createFinalFormData = (formData) => {
        const finalFormData = new FormData()
        
        // Agregar datos del formulario
        Object.entries(formData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                // Para arrays como productos y testimoniales, convertir a JSON
                finalFormData.append(key, JSON.stringify(value))
            } else if (typeof value === 'object' && value !== null) {
                finalFormData.append(key, JSON.stringify(value))
            } else {
                finalFormData.append(key, value)
            }
        })
        
        // Agregar archivos de cada stage
        Object.entries(filesData).forEach(([stage, files]) => {
            Object.entries(files).forEach(([fileKey, file]) => {
                if (file) {
                    finalFormData.append(`${stage}_${fileKey}`, file)
                }
            })
        })
        
        return finalFormData
    }

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
                
                // Crear FormData consolidado
                const finalFormData = createFinalFormData(updatedData)
                
                console.log('Form submitted with FormData:')
                console.log('Regular data:', updatedData)
                console.log('Files data:', filesData)
                
                // Log FormData entries for debugging
                for (let pair of finalFormData.entries()) {
                    console.log(pair[0] + ': ' + (pair[1] instanceof File ? `File: ${pair[1].name}` : pair[1]))
                }
                
                alert('¡Formulario enviado exitosamente con archivos!')
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
        filesData,
        isSubmitting,
        handleSubmit,
        handleBack,
        checkStepComplete,
        updateStageFiles,
        setActiveStep,
        setFormData
    }
}
