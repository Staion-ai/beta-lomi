import React, { createContext, useContext, useState, useMemo } from 'react'
import PropTypes from 'prop-types'

const Stage1Context = createContext()

export const useStage1Context = () => {
    const context = useContext(Stage1Context)
    if (!context) {
        throw new Error('useStage1Context must be used within a Stage1Provider')
    }
    return context
}

export const Stage1Provider = ({ children }) => {
    const [companyNameValidationState, setCompanyNameValidationState] = useState('idle')

    const value = useMemo(() => ({
        companyNameValidationState,
        setCompanyNameValidationState,
        // Los campos están habilitados SOLO cuando el nombre está disponible
        shouldEnableOtherFields: companyNameValidationState === 'available'
    }), [companyNameValidationState])

    return (
        <Stage1Context.Provider value={value}>
            {children}
        </Stage1Context.Provider>
    )
}

Stage1Provider.propTypes = {
    children: PropTypes.node.isRequired
}