import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Box, TextField } from '@mui/material'
import ImageUpload from './ImageUpload'

function ProductForm({ index, onImageUpload }) {
    const { control, formState: { errors } } = useFormContext()

    return (
        <Box className="card-content">
            <Controller
                name={`products.${index}.name`}
                control={control}
                rules={{
                    required: 'El nombre del producto/servicio es requerido',
                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                }}
                render={({ field }) => (
                    <Box className="form-field">
                        <label className="input-label">
                            Nombre del producto o servicio
                        </label>
                        <TextField
                            {...field}
                            variant="outlined"
                            placeholder="Ej: Desarrollo Web, Consultoría, etc."
                            fullWidth
                            error={!!errors.products?.[index]?.name}
                            helperText={errors.products?.[index]?.name?.message}
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

            <Controller
                name={`products.${index}.description`}
                control={control}
                rules={{
                    required: 'La descripción es requerida',
                    minLength: { value: 10, message: 'Mínimo 10 caracteres' }
                }}
                render={({ field }) => (
                    <Box className="form-field">
                        <label className="input-label">
                            Descripción del producto o servicio
                        </label>
                        <TextField
                            {...field}
                            variant="outlined"
                            placeholder="Describe brevemente el producto o servicio..."
                            fullWidth
                            multiline
                            rows={4}
                            error={!!errors.products?.[index]?.description}
                            helperText={errors.products?.[index]?.description?.message}
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

            <Controller
                name={`products.${index}.image`}
                control={control}
                rules={{
                    required: 'La imagen es requerida'
                }}
                render={({ field: { onChange, value } }) => (
                    <ImageUpload
                        index={index}
                        value={value}
                        onChange={onChange}
                        error={errors.products?.[index]?.image}
                        onImageUpload={onImageUpload}
                    />
                )}
            />
        </Box>
    )
}

export default ProductForm
