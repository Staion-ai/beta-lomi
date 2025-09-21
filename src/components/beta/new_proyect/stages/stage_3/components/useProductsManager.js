import { useState } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'

export function useProductsManager(updateStageFiles) {
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
            setCollapsedCards(prev => ({
                ...prev,
                [newIndex]: false
            }))
        }
    }

    const removeProduct = (index) => {
        remove(index)
        setCollapsedCards(prev => {
            const newState = { ...prev }
            delete newState[index]
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

        if (updateStageFiles) {
            updateStageFiles('stage2', `product_${index}_image`, null)
        }
    }

    const handleImageUpload = (index, file) => {

        if (updateStageFiles && file) {
            updateStageFiles('stage2', `product_${index}_image`, file)
        }
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
