import { useState } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'

export function useProductsManager() {
    const { control } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'products'
    })

    const [collapsedCards, setCollapsedCards] = useState({})

    const toggleCardCollapse = (index) => {
        setCollapsedCards(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    const addProduct = () => {
        if (fields.length < 4) {
            const newIndex = fields.length
            append({
                name: '',
                image: null
            })
            // Expandir automáticamente la nueva card
            setCollapsedCards(prev => ({
                ...prev,
                [newIndex]: false
            }))
        }
    }

    const removeProduct = (index) => {
        remove(index)
        // Limpiar el estado de colapso para evitar índices incorrectos
        setCollapsedCards(prev => {
            const newState = { ...prev }
            delete newState[index]
            // Reajustar índices superiores
            const updatedState = {}
            Object.keys(newState).forEach(key => {
                const numKey = parseInt(key)
                if (numKey > index) {
                    updatedState[numKey - 1] = newState[key]
                } else {
                    updatedState[key] = newState[key]
                }
            })
            return updatedState
        })
    }

    const handleImageUpload = (index, file) => {
        // Custom logic for handling image upload can be added here
        console.log(`Image uploaded for product ${index}:`, file)
    }

    return {
        fields,
        collapsedCards,
        toggleCardCollapse,
        addProduct,
        removeProduct,
        handleImageUpload
    }
}
