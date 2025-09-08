import React, { createContext, useContext, useState, useMemo } from 'react'
import PropTypes from 'prop-types'

const TemplateContext = createContext({})

export const TemplateProvider = ({ children }) => {
    const [templateContent, setTemplateContent] = useState(null)
    const [isGenerating, setIsGenerating] = useState(false)

    const updateTemplateContent = (content) => {
        console.log('TemplateContext - Updating content:', content)
        setTemplateContent(content)
    }

    const clearTemplateContent = () => {
        setTemplateContent(null)
    }

    const value = useMemo(() => ({
        templateContent,
        isGenerating,
        setIsGenerating,
        updateTemplateContent,
        clearTemplateContent
    }), [templateContent, isGenerating])

    return (
        <TemplateContext.Provider value={value}>
            {children}
        </TemplateContext.Provider>
    )
}

TemplateProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export const useTemplate = () => {
    const context = useContext(TemplateContext)
    if (!context) {
        throw new Error('useTemplate debe ser usado dentro de un TemplateProvider')
    }
    return context
}

export default TemplateContext
