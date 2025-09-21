import { useState } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'

export function useClientsManager() {
    const { control, formState: { errors } } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'testimonials'
    })

    const [expandedItems, setExpandedItems] = useState({})

    const addClient = () => {
        if (fields.length < 4) {
            const newIndex = fields.length
            append({
                clientCompany: '',
                image: null
            })
            setExpandedItems(prev => ({ ...prev, [newIndex]: true }))
        }
    }

    const removeClient = (index) => {
        remove(index)
        setExpandedItems(prev => {
            const newState = { ...prev }
            delete newState[index]
            Object.keys(newState).forEach(key => {
                const numKey = parseInt(key)
                if (numKey > index) {
                    newState[numKey - 1] = newState[numKey]
                    delete newState[numKey]
                }
            })
            return newState
        })
    }

    const toggleExpand = (index) => {
        setExpandedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    return {
        fields,
        errors,
        expandedItems,
        addClient,
        removeClient,
        toggleExpand
    }
}
