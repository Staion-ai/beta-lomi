import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

/**
 * Hook personalizado para limpiar los enlaces de redes sociales
 * que no están seleccionadas actualmente
 */
export const useSocialNetworksCleaner = () => {
    const { watch, setValue } = useFormContext()

    const selectedNetworks = watch('socialNetworks', [])
    const socialNetworkLinks = watch('socialNetworkLinks', {})

    useEffect(() => {
        if (!selectedNetworks || !socialNetworkLinks) return

        // Obtener las redes sociales que tienen enlaces pero ya no están seleccionadas
        const networksToRemove = Object.keys(socialNetworkLinks).filter(
            network => !selectedNetworks.includes(network)
        )

        // Si hay redes para remover, actualizar los enlaces
        if (networksToRemove.length > 0) {
            const updatedLinks = { ...socialNetworkLinks }
            networksToRemove.forEach(network => {
                delete updatedLinks[network]
            })
            setValue('socialNetworkLinks', updatedLinks)
        }
    }, [selectedNetworks, socialNetworkLinks, setValue])

    /**
     * Función para limpiar manualmente los enlaces no utilizados
     * antes del envío del formulario
     */
    const cleanUnusedLinks = () => {
        const currentSelected = watch('socialNetworks', [])
        const currentLinks = watch('socialNetworkLinks', {})

        // Filtrar solo los enlaces de las redes sociales seleccionadas
        const cleanedLinks = {}
        currentSelected.forEach(network => {
            if (currentLinks[network]) {
                cleanedLinks[network] = currentLinks[network]
            }
        })

        setValue('socialNetworkLinks', cleanedLinks)
        return cleanedLinks
    }

    return {
        cleanUnusedLinks
    }
}
