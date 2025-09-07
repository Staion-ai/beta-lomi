import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Box, TextField } from '@mui/material'

function CompanyNameField() {
    const { control, formState: { errors } } = useFormContext()

    return (
        <Controller
            name="company_name"
            control={control}
            rules={{
                required: 'El nombre de la empresa es requerido',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
            }}
            render={({ field }) => (
                <Box className="form-field">
                    <label htmlFor="companyName" className="input-label">
                        ¿Cómo se llama tu empresa o marca?
                    </label>
                    <TextField
                        {...field}
                        id="companyName"
                        variant="outlined"
                        placeholder="Ingresa el nombre de tu empresa"
                        fullWidth
                        error={!!errors.companyName}
                        helperText={errors.companyName?.message}
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

export default CompanyNameField
