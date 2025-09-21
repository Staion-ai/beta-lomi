import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Box, TextField } from '@mui/material'
import { useStage1Context } from '../context/Stage1Context'

function EmailField() {
    const { control, formState: { errors } } = useFormContext()
    const { shouldEnableOtherFields } = useStage1Context()

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    return (
        <Controller
            name="email"
            control={control}
            rules={{
                required: 'El email es requerido',
                pattern: {
                    value: emailRegex,
                    message: 'Por favor ingresa un email válido'
                }
            }}
            render={({ field }) => (
                <Box className="form-field">
                    <label htmlFor="email" className="input-label">
                        ¿Cuál es tu email de contacto? *
                    </label>
                    <TextField
                        {...field}
                        id="email"
                        type="email"
                        variant="outlined"
                        placeholder="ejemplo@empresa.com"
                        fullWidth
                        disabled={!shouldEnableOtherFields}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        sx={{
                            '& .MuiFormHelperText-root': {
                                color: '#ff5252',
                                marginLeft: '15px',
                                fontSize: '14px'
                            }
                        }}
                    />
                </Box>
            )}
        />
    )
}

export default EmailField