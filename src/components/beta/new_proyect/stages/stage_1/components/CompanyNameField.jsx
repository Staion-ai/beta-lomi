import React, { useEffect, useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Box, TextField, Typography, CircularProgress } from '@mui/material'
import { CheckCircle, Error } from '@mui/icons-material'
import { useCheckNameProject, useDebounce } from '../../../../../../hooks'
import { useAuth } from '../../../../../../contexts'
import { useStage1Context } from '../context/Stage1Context'

function CompanyNameField() {
    const { control, formState: { errors }, watch } = useFormContext()
    const { user } = useAuth()
    const { setCompanyNameValidationState } = useStage1Context()
    const [validationMessage, setValidationMessage] = useState('')
    const [validationState, setValidationState] = useState('idle') // 'idle', 'loading', 'available', 'unavailable'

    // Observar el valor del campo en tiempo real
    const companyName = watch('company_name')

    // Aplicar debounce de 3 segundos
    const debouncedCompanyName = useDebounce(companyName, 1000)

    // Hook para validar nombre del proyecto
    const {
        data: checkResult,
        isLoading,
        error: checkError,
        refetch
    } = useCheckNameProject(
        debouncedCompanyName,
        user?.pk,
        false // Inicialmente deshabilitado
    )

    // Efecto para manejar la validación cuando cambia el nombre debounced
    useEffect(() => {
        if (debouncedCompanyName && debouncedCompanyName.trim().length >= 2 && user?.pk) {
            setValidationState('loading')
            setValidationMessage('Verificando disponibilidad...')
            setCompanyNameValidationState('loading')
            refetch()
        } else {
            // Campo vacío o muy corto - mantener estado idle
            setValidationState('idle')
            setValidationMessage('')
            setCompanyNameValidationState('idle')
        }
    }, [debouncedCompanyName, user?.pk, refetch, setCompanyNameValidationState])

    // Efecto adicional para manejar cuando el usuario está escribiendo pero aún no ha llegado al debounce
    useEffect(() => {
        if (companyName && companyName.trim().length > 0 && companyName.trim().length < 2) {
            setValidationState('idle')
            setValidationMessage('Mínimo 2 caracteres')
            setCompanyNameValidationState('idle')
        }
    }, [companyName, setCompanyNameValidationState])

    // Efecto para manejar el resultado de la validación
    useEffect(() => {
        if (checkResult && !isLoading) {
            if (checkResult.exists === false) {
                setValidationState('available')
                setCompanyNameValidationState('available')
                setValidationMessage('✓ Nombre disponible')
            } else {
                setValidationState('unavailable')
                setCompanyNameValidationState('unavailable')
                setValidationMessage('✗ Este nombre ya está en uso')
            }
        }

        if (checkError && !isLoading) {
            setValidationState('idle')
            setCompanyNameValidationState('idle')
            setValidationMessage('Error al verificar disponibilidad')
        }
    }, [checkResult, isLoading, checkError, setCompanyNameValidationState])

    // Función para obtener el color del helper text
    const getHelperTextColor = () => {
        if (errors.company_name) return '#ff5252'

        switch (validationState) {
            case 'available':
                return '#4caf50'
            case 'unavailable':
                return '#ff5252'
            case 'loading':
                return '#2196f3'
            default:
                return '#666'
        }
    }

    // Función para obtener el mensaje a mostrar
    const getDisplayMessage = () => {
        if (errors.company_name) {
            const message = errors.company_name.message
            return typeof message === 'string' ? message : ''
        }
        return validationMessage || ''
    }

    // Función para obtener el ícono a mostrar
    const getValidationIcon = () => {
        if (isLoading) {
            return <CircularProgress size={16} sx={{ color: '#2196f3' }} />
        }

        switch (validationState) {
            case 'available':
                return <CheckCircle sx={{ fontSize: 16, color: '#4caf50' }} />
            case 'unavailable':
                return <Error sx={{ fontSize: 16, color: '#ff5252' }} />
            default:
                return null
        }
    }

    return (
        <Controller
            name="company_name"
            control={control}
            rules={{
                required: 'El nombre de la empresa es requerido',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                validate: () => {
                    // Validación adicional para nombres no disponibles
                    if (validationState === 'unavailable') {
                        return 'Este nombre no está disponible'
                    }
                    return true
                }
            }}
            render={({ field }) => (
                <Box className="form-field">
                    <label htmlFor="companyName" className="input-label">
                        ¿Cómo se llama tu empresa o marca? *
                    </label>
                    <TextField
                        {...field}
                        id="companyName"
                        variant="outlined"
                        placeholder="Ingresa el nombre de tu empresa"
                        fullWidth
                        error={!!errors.company_name || validationState === 'unavailable'}
                        helperText={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                {getValidationIcon()}
                                <Typography
                                    component="span"
                                    sx={{
                                        fontSize: '14px',
                                        color: getHelperTextColor()
                                    }}
                                >
                                    {getDisplayMessage()}
                                </Typography>
                            </Box>
                        }
                        sx={{
                            '& .MuiFormHelperText-root': {
                                marginLeft: '15px',
                            }
                        }}
                    />
                </Box>
            )}
        />
    )
}

export default CompanyNameField
