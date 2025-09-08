/**
 * Hook personalizado para manejar la validación del formulario multi-paso
 */

export const useFormValidation = () => {
    // Validación para el paso actual
    const validateCurrentStep = (activeStep, data) => {
        const errors = []

        if (!data) {
            errors.push('No hay datos del formulario disponibles')
            return errors
        }

        switch (activeStep) {
            case 0: // Stage 1 - Información de la empresa
                if (!data.company_name || typeof data.company_name !== 'string' || data.company_name.trim().length < 2) {
                    errors.push('El nombre de la empresa es requerido (mínimo 2 caracteres)')
                }
                if (!data.description || typeof data.description !== 'string' || data.description.trim().length < 10) {
                    errors.push('La descripción de la empresa es requerida (mínimo 10 caracteres)')
                }
                if (!data.colors || !Array.isArray(data.colors) || data.colors.length === 0) {
                    errors.push('Debes seleccionar al menos un color para tu marca')
                }
                break

            case 1: // Stage 2 - Productos y servicios
                if (!data.products || !Array.isArray(data.products) || data.products.length === 0) {
                    errors.push('Debes agregar al menos un producto o servicio')
                } else {
                    // Validar que cada producto tenga los campos requeridos
                    data.products.forEach((product, index) => {
                        if (!product) {
                            errors.push(`Producto ${index + 1}: Datos del producto no encontrados`)
                            return
                        }
                        if (!product.name || typeof product.name !== 'string' || product.name.trim().length < 2) {
                            errors.push(`Producto ${index + 1}: El nombre es requerido (mínimo 2 caracteres)`)
                        }
                        if (!product.description || typeof product.description !== 'string' || product.description.trim().length < 10) {
                            errors.push(`Producto ${index + 1}: La descripción es requerida (mínimo 10 caracteres)`)
                        }
                        if (!product.image) {
                            errors.push(`Producto ${index + 1}: La imagen es requerida`)
                        }
                    })
                }
                break

            case 2: // Stage 3 - Clientes
                if (!data.testimonials || !Array.isArray(data.testimonials) || data.testimonials.length === 0) {
                    errors.push('Debes agregar al menos un cliente')
                } else {
                    // Validar que cada cliente tenga los campos requeridos
                    data.testimonials.forEach((client, index) => {
                        if (!client) {
                            errors.push(`Cliente ${index + 1}: Datos del cliente no encontrados`)
                            return
                        }
                        if (!client.clientCompany || typeof client.clientCompany !== 'string' || client.clientCompany.trim().length < 2) {
                            errors.push(`Cliente ${index + 1}: La compañía es requerida (mínimo 2 caracteres)`)
                        }
                    })
                }
                break

            default:
                break
        }

        return errors
    }

    // Validación completa de todos los pasos
    const validateAllSteps = (data) => {
        const errors = []

        // Validar Stage 1
        if (!data.company_name || data.company_name.trim().length < 2) {
            errors.push('Etapa 1: El nombre de la empresa es requerido')
        }
        if (!data.description || data.description.trim().length < 10) {
            errors.push('Etapa 1: La descripción de la empresa es requerida')
        }
        if (!data.colors || data.colors.length === 0) {
            errors.push('Etapa 1: Debes seleccionar al menos un color')
        }

        // Validar Stage 2
        if (!data.products || data.products.length === 0) {
            errors.push('Etapa 2: Debes agregar al menos un producto o servicio')
        } else {
            const incompleteProducts = data.products.filter(p => !p.name || !p.image)
            if (incompleteProducts.length > 0) {
                errors.push('Etapa 2: Todos los productos deben tener nombre e imagen')
            }
        }

        // Validar Stage 3
        if (!data.testimonials || data.testimonials.length === 0) {
            errors.push('Etapa 3: Debes agregar al menos un cliente')
        } else {
            const incompleteClients = data.testimonials.filter(t => !t.clientCompany)
            if (incompleteClients.length > 0) {
                errors.push('Etapa 3: Todos los clientes deben tener compañía')
            }
        }

        return errors
    }

    // Verificar si un paso específico está completo
    const isStepComplete = (stepIndex, data) => {
        if (!data) return false

        switch (stepIndex) {
            case 0:
                return (
                    data.company_name &&
                    typeof data.company_name === 'string' &&
                    data.company_name.trim().length >= 2 &&
                    data.description &&
                    typeof data.description === 'string' &&
                    data.description.trim().length >= 10 &&
                    data.colors &&
                    Array.isArray(data.colors) &&
                    data.colors.length > 0
                )
            case 1:
                return (
                    data.products &&
                    Array.isArray(data.products) &&
                    data.products.length > 0 &&
                    data.products.every(p =>
                        p &&
                        p.name &&
                        typeof p.name === 'string' &&
                        p.name.trim().length >= 2 &&
                        p.image
                    )
                )
            case 2:
                return (
                    data.testimonials &&
                    Array.isArray(data.testimonials) &&
                    data.testimonials.length > 0 &&
                    data.testimonials.every(t =>
                        t &&
                        t.clientCompany &&
                        typeof t.clientCompany === 'string' &&
                        t.clientCompany.trim().length >= 2
                    )
                )
            default:
                return false
        }
    }

    // Mostrar errores en alert
    const showValidationErrors = (errors) => {
        if (errors.length > 0) {
            const errorMessage = "Por favor, completa los siguientes campos:\n\n" +
                errors.map(error => `• ${error}`).join('\n')
            alert(errorMessage)
            return true
        }
        return false
    }

    return {
        validateCurrentStep,
        validateAllSteps,
        isStepComplete,
        showValidationErrors
    }
}
