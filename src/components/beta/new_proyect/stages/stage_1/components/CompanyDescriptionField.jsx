import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Box, TextField } from '@mui/material'

function CompanyDescriptionField() {
    const { control, formState: { errors } } = useFormContext()

    return (
        <Controller
            name="companyDescription"
            control={control}
            rules={{
                required: 'La descripción es requerida',
                minLength: { value: 10, message: 'Mínimo 10 caracteres' },
                maxLength: { value: 500, message: 'Máximo 500 caracteres' }
            }}
            render={({ field }) => (
                <Box className="form-field">
                    <label htmlFor="companyDescription" className="input-label">
                        Describe qué hace tu empresa y en qué área se desarrolla
                    </label>
                    <TextField
                        {...field}
                        id="companyDescription"
                        variant="outlined"
                        placeholder="Describe tu empresa, productos o servicios..."
                        fullWidth
                        multiline
                        rows={4}
                        error={!!errors.companyDescription}
                        helperText={errors.companyDescription?.message}
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

export default CompanyDescriptionField
