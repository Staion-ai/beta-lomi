/**
 * Hook personalizado para manejar la validación del formulario multi-paso
 */

export const useFormValidation = () => {
    const validateCurrentStep = (activeStep, data) => {
        const errors = []

        if (!data) {
            errors.push('No hay datos del formulario disponibles')
            return errors
        }

        switch (activeStep) {
            case 0:
                if (!data.company_name || typeof data.company_name !== 'string' || data.company_name.trim().length < 2) {
                    errors.push('El nombre de la empresa es requerido (mínimo 2 caracteres)')
                }
                if (!data.description || typeof data.description !== 'string' || data.description.trim().length < 10) {
                    errors.push('La descripción de la empresa es requerida (mínimo 10 caracteres)')
                }
                if (!data.logo) {
                    errors.push('El logo de la empresa es obligatorio')
                }
                if (!data.heroImage) {
                    errors.push('La imagen del hero es obligatoria')
                }
                if (!data.colors || !Array.isArray(data.colors) || data.colors.length === 0) {
                    errors.push('Debes seleccionar al menos un color para tu marca')
                }
                if (!data.socialNetworks || !Array.isArray(data.socialNetworks) || data.socialNetworks.length < 2) {
                    errors.push('Debes seleccionar al menos 2 redes sociales')
                }
                if (data.socialNetworks && Array.isArray(data.socialNetworks)) {
                    data.socialNetworks.forEach(network => {
                        const link = data.socialNetworkLinks?.[network]
                        if (!link || typeof link !== 'string' || link.trim().length === 0) {
                            errors.push(`El enlace de ${network} es requerido`)
                        } else if (!/^https?:\/\/.+/.test(link)) {
                            errors.push(`El enlace de ${network} debe ser una URL válida`)
                        }
                    })
                }
                break

            case 1:
                if (!data.products || !Array.isArray(data.products) || data.products.length === 0) {
                    errors.push('Debes agregar al menos un producto o servicio')
                } else {
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

            case 2:
                if (!data.testimonials || !Array.isArray(data.testimonials) || data.testimonials.length === 0) {
                    errors.push('Debes agregar al menos un cliente')
                } else {
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

    const validateAllSteps = (data) => {
        const errors = []

        if (!data.company_name || data.company_name.trim().length < 2) {
            errors.push('Etapa 1: El nombre de la empresa es requerido')
        }
        if (!data.description || data.description.trim().length < 10) {
            errors.push('Etapa 1: La descripción de la empresa es requerida')
        }
        if (!data.logo) {
            errors.push('Etapa 1: El logo de la empresa es obligatorio')
        }
        if (!data.heroImage) {
            errors.push('Etapa 1: La imagen del hero es obligatoria')
        }
        if (!data.colors || data.colors.length === 0) {
            errors.push('Etapa 1: Debes seleccionar al menos un color')
        }
        if (!data.socialNetworks || data.socialNetworks.length < 2) {
            errors.push('Etapa 1: Debes seleccionar al menos 2 redes sociales')
        }
        if (data.socialNetworks && data.socialNetworks.length > 0) {
            data.socialNetworks.forEach(network => {
                const link = data.socialNetworkLinks?.[network]
                if (!link || !/^https?:\/\/.+/.test(link)) {
                    errors.push(`Etapa 1: Enlace de ${network} inválido o faltante`)
                }
            })
        }

        if (!data.products || data.products.length === 0) {
            errors.push('Etapa 2: Debes agregar al menos un producto o servicio')
        } else {
            const incompleteProducts = data.products.filter(p => !p.name || !p.image)
            if (incompleteProducts.length > 0) {
                errors.push('Etapa 2: Todos los productos deben tener nombre e imagen')
            }
        }

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
                    data.logo &&
                    data.heroImage &&
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
