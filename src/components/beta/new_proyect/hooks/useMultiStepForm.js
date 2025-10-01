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

    const createFormData = (currentFormData = {}) => {
        const finalFormData = new FormData()

        finalFormData.append('user_id', 'user_12345')

        if (currentFormData.logo && currentFormData.logo instanceof File) {
            finalFormData.append('files', currentFormData.logo)
        }

        if (currentFormData.heroImage && currentFormData.heroImage instanceof File) {
            finalFormData.append('files', currentFormData.heroImage)
        }

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

        let updatedLogo = data.logo;
        if (data.logo && data.logo instanceof File && urlMap[data.logo.name]) {
            updatedLogo = urlMap[data.logo.name];
        }

        let updatedHeroImage = data.heroImage;
        if (data.heroImage && data.heroImage instanceof File && urlMap[data.heroImage.name]) {
            updatedHeroImage = urlMap[data.heroImage.name];
        }

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
            logo: updatedLogo,
            heroImage: updatedHeroImage,
            products: updatedProducts,
            testimonials: updatedTestimonials
        };
    }

    const updateHeroBackgroundWithImage = (templateContent, formData) => {
        if (!templateContent) {
            console.warn('No template content available to update hero background')
            return templateContent
        }

        let imageUrl = null

        // Priorizar la imagen del hero si existe
        if (formData?.heroImage &&
            typeof formData.heroImage === 'string' &&
            (formData.heroImage.startsWith('http') || formData.heroImage.startsWith('https'))) {
            imageUrl = formData.heroImage
        }

        // Si no hay imagen del hero, usar imagen de productos como fallback
        if (!imageUrl && formData?.products && formData.products.length > 0) {
            const productWithImage = formData.products.find(product =>
                product.image &&
                (product.image.startsWith('http') || product.image.startsWith('https'))
            )
            if (productWithImage) {
                imageUrl = productWithImage.image
            }
        }

        // Si no hay imagen de productos, usar imagen de testimoniales como último recurso
        if (!imageUrl && formData?.testimonials && formData.testimonials.length > 0) {
            const testimonialWithImage = formData.testimonials.find(testimonial =>
                testimonial.image &&
                (testimonial.image.startsWith('http') || testimonial.image.startsWith('https'))
            )
            if (testimonialWithImage) {
                imageUrl = testimonialWithImage.image
            }
        }

        if (imageUrl && templateContent.hero_section) {
            return {
                ...templateContent,
                hero_section: {
                    ...templateContent.hero_section,
                    background_image: imageUrl
                }
            }
        }

        return templateContent
    }

    const updateNavbarLogoWithUrl = (templateContent, formData) => {
        if (!templateContent || !formData?.logo) {
            console.warn('No template content or logo available to update navbar')
            return templateContent
        }

        if (typeof formData.logo === 'string' &&
            (formData.logo.startsWith('http') || formData.logo.startsWith('https'))) {

            return {
                ...templateContent,
                navbar: {
                    ...templateContent.navbar,
                    logo: {
                        ...templateContent.navbar?.logo,
                        image_url: formData.logo
                    }
                },
                footer: {
                    ...templateContent.footer,
                    logo: {
                        ...templateContent.footer?.logo,
                        image_url: formData.logo
                    }
                }
            }
        }

        return templateContent
    }

    // Función para filtrar las imágenes del objeto de datos antes de guardar en localStorage
    const filterImageDataForStorage = (data) => {
        const filteredData = { ...data }

        // Remover imágenes principales si son archivos (File objects)
        if (filteredData.logo instanceof File) {
            delete filteredData.logo
        }
        if (filteredData.heroImage instanceof File) {
            delete filteredData.heroImage
        }

        // Filtrar imágenes de productos
        if (filteredData.products && Array.isArray(filteredData.products)) {
            filteredData.products = filteredData.products.map(product => {
                const filteredProduct = { ...product }
                if (typeof filteredProduct.image !== 'string' || filteredProduct.image instanceof File) {
                    delete filteredProduct.image
                }
                return filteredProduct
            })
        }

        // Filtrar imágenes de testimoniales
        if (filteredData.testimonials && Array.isArray(filteredData.testimonials)) {
            filteredData.testimonials = filteredData.testimonials.map(testimonial => {
                const filteredTestimonial = { ...testimonial }
                if (typeof filteredTestimonial.image !== 'string' || filteredTestimonial.image instanceof File) {
                    delete filteredTestimonial.image
                }
                return filteredTestimonial
            })
        }

        return filteredData
    }

    const handleSubmit = async (data) => {
        setIsSubmitting(true)

        try {
            const currentStepErrors = validateCurrentStep(activeStep, data)

            if (currentStepErrors.length > 0) {
                const errorMessage = "Por favor, completa los siguientes campos:\n\n" +
                    currentStepErrors.map(error => `• ${error}`).join('\n')
                setNotification({ open: true, message: errorMessage, severity: 'error' })
                return
            }

            const updatedData = { ...formData, ...data }
            setFormData(updatedData)

            if (activeStep === steps.length - 1) {
                if (updatedData.socialNetworks && updatedData.socialNetworkLinks) {
                    const cleanedLinks = {}
                    updatedData.socialNetworks.forEach(network => {
                        if (updatedData.socialNetworkLinks[network]) {
                            cleanedLinks[network] = updatedData.socialNetworkLinks[network]
                        }
                    })
                    updatedData.socialNetworkLinks = cleanedLinks
                }

                const allErrors = validateAllSteps(updatedData)
                if (allErrors.length > 0) {
                    const errorMessage = "Por favor, completa todos los campos requeridos:\n\n" +
                        allErrors.map(error => `• ${error}`).join('\n')
                    setNotification({ open: true, message: errorMessage, severity: 'error' })
                    return
                }

                updatedData.country = "Colombia"

                // Guardar datos del formulario en localStorage (sin imágenes File)
                const dataForStorage = filterImageDataForStorage(updatedData)
                localStorage.setItem('template_form_data', JSON.stringify(dataForStorage))

                const finalFormData = createFormData(updatedData)

                setIsUploadingImages(true)
                try {
                    const response = await createImagesUrl(finalFormData)
                    const updatedDataWithUrls = updateImagesWithUrls(updatedData, response)
                    setFormData(updatedDataWithUrls)

                    setIsUploadingImages(false)
                    setIsGeneratingContent(true)

                    const content = await generateTemplateContent(updatedDataWithUrls)

                    let updatedContent = updateHeroBackgroundWithImage(content, updatedDataWithUrls)

                    updatedContent = updateNavbarLogoWithUrl(updatedContent, updatedDataWithUrls)

                    updateTemplateContent(updatedContent, updatedDataWithUrls) // Actualizar el context con el contenido y los datos originales                    setNotification({ open: true, message: 'Proyecto creado exitosamente. Contenido generado.', severity: 'success' })
                    localStorage.setItem("template_content", JSON.stringify(templateContent))
                    if (onComplete) {
                        setTimeout(() => {
                            onComplete(updatedContent)
                        }, 2000)
                    }
                } catch (error) {
                    console.error('Error uploading images or generating content:', error)
                    setNotification({ open: true, message: 'Error al procesar el proyecto. Inténtalo de nuevo.', severity: 'error' })
                } finally {
                    setIsUploadingImages(false)
                    setIsGeneratingContent(false)
                }
            } else {
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
