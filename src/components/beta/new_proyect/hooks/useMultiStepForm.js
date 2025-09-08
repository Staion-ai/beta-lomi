/**
 * Hook personalizado para manejar la lógica del formulario multi-paso
 */
import { useState } from 'react'
import { useFormValidation } from './useFormValidation'
import { useCreateImagesUrl } from './useFetchImages'
import { useTemplateContent } from './useTemplateContent'
import { useTemplate } from '../../../../contexts/TemplateContext'

export const useMultiStepForm = (steps, onComplete) => {
    const [activeStep, setActiveStep] = useState(0)
    const [formData, setFormData] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [filesData, setFilesData] = useState({
        stage2: {},
        stage3: {}
    })
    const [isUploadingImages, setIsUploadingImages] = useState(false)
    const [isGeneratingContent, setIsGeneratingContent] = useState(false)
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' })

    const { updateTemplateContent, templateContent } = useTemplate()
    const { mutateAsync: createImagesUrl } = useCreateImagesUrl()
    const { mutateAsync: generateTemplateContent } = useTemplateContent()

    const {
        validateCurrentStep,
        validateAllSteps,
        isStepComplete,
        showValidationErrors
    } = useFormValidation()

    const updateStageFiles = (stage, fileKey, file) => {
        setFilesData(prev => ({
            ...prev,
            [stage]: {
                ...prev[stage],
                [fileKey]: file
            }
        }))
    }

    const createFormData = () => {
        const finalFormData = new FormData()

        // Agregar user_id ficticio
        finalFormData.append('user_id', 'user_12345')

        // Agregar archivos de cada stage
        Object.entries(filesData).forEach(([/* stage */, files]) => {
            Object.entries(files).forEach(([/* fileKey */, file]) => {
                if (file) {
                    finalFormData.append('files', file)
                }
            })
        })

        return finalFormData
    }

    const updateImagesWithUrls = (data, response) => {
        const urlMap = {};
        response.forEach(item => {
            urlMap[item.original_filename] = item.file_url;
        });

        const updatedProducts = data.products.map(product => ({
            ...product,
            image: urlMap[product.image] || product.image
        }));

        const updatedTestimonials = data.testimonials.map(testimonial => ({
            ...testimonial,
            image: urlMap[testimonial.image] || testimonial.image
        }));

        return {
            ...data,
            products: updatedProducts,
            testimonials: updatedTestimonials
        };
    }

    const handleSubmit = async (data) => {
        setIsSubmitting(true)

        try {
            // Validar el paso actual antes de continuar
            const currentStepErrors = validateCurrentStep(activeStep, data)
            console.log('Current step:', activeStep)
            console.log('Form data:', data)
            console.log('Validation errors:', currentStepErrors)

            if (currentStepErrors.length > 0) {
                const errorMessage = "Por favor, completa los siguientes campos:\n\n" +
                    currentStepErrors.map(error => `• ${error}`).join('\n')
                setNotification({ open: true, message: errorMessage, severity: 'error' })
                return
            }

            const updatedData = { ...formData, ...data }
            setFormData(updatedData)

            if (activeStep === steps.length - 1) {
                // Final step - validate all steps
                const allErrors = validateAllSteps(updatedData)
                if (allErrors.length > 0) {
                    const errorMessage = "Por favor, completa todos los campos requeridos:\n\n" +
                        allErrors.map(error => `• ${error}`).join('\n')
                    setNotification({ open: true, message: errorMessage, severity: 'error' })
                    return
                }

                // Add default country
                updatedData.country = "Colombia"

                const finalFormData = createFormData()

                setIsUploadingImages(true)
                try {
                    const response = await createImagesUrl(finalFormData)
                    const updatedDataWithUrls = updateImagesWithUrls(updatedData, response)
                    setFormData(updatedDataWithUrls)

                    setIsUploadingImages(false)
                    setIsGeneratingContent(true)

                    const content = await generateTemplateContent(updatedDataWithUrls)
                    console.log('Generated content:', content)
                    updateTemplateContent(content) // Actualizar el context con el contenido generado

                    setNotification({ open: true, message: 'Proyecto creado exitosamente. Contenido generado.', severity: 'success' })

                    // Navigate to preview with template content after successful completion
                    if (onComplete) {
                        setTimeout(() => {
                            onComplete(content) // Pasar el contenido generado por la API
                        }, 2000) // Wait 2 seconds to show success message
                    }
                } catch (error) {
                    console.error('Error uploading images or generating content:', error)
                    setNotification({ open: true, message: 'Error al procesar el proyecto. Inténtalo de nuevo.', severity: 'error' })
                } finally {
                    setIsUploadingImages(false)
                    setIsGeneratingContent(false)
                }
            } else {
                // Move to next step
                setActiveStep(activeStep + 1)
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1)
        }
    }

    const handleCloseNotification = () => setNotification({ ...notification, open: false })

    const showCurrentStepErrors = (data) => {
        const currentStepErrors = validateCurrentStep(activeStep, data)
        if (currentStepErrors.length > 0) {
            const errorMessage = "Para continuar al siguiente paso, completa:\n\n" +
                currentStepErrors.map(error => `• ${error}`).join('\n')
            setNotification({ open: true, message: errorMessage, severity: 'warning' })
        }
    }

    return {
        activeStep,
        formData,
        filesData,
        isSubmitting,
        isUploadingImages,
        isGeneratingContent,
        notification,
        handleCloseNotification,
        handleSubmit,
        handleBack,
        isStepComplete,
        updateStageFiles,
        setActiveStep,
        setFormData,
        showCurrentStepErrors,
        templateContent
    }
}
