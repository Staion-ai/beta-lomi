import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import {
    Box,
    TextField,
    Typography
} from '@mui/material'

function ClientForm({ index, updateStageFiles }) {
    const { control, formState: { errors } } = useFormContext()

    const handleImageUpload = (index, event, onChange, updateStageFiles) => {
        const file = event.target.files[0]
        if (file) {
            // Almacenar el nombre del archivo en el formulario para visualización
            onChange(file.name)

            // Almacenar el archivo real usando updateStageFiles
            if (updateStageFiles) {
                updateStageFiles('stage3', `testimonial_${index}_image`, file)
            }
        }
    }

    return (
        <>
            <Controller
                name={`testimonials.${index}.clientCompany`}
                control={control}
                rules={{
                    required: 'El nombre de la compañía es requerido',
                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                }}
                render={({ field }) => (
                    <Box className="form-field">
                        <label className="input-label">
                            Compañía del cliente
                        </label>
                        <TextField
                            {...field}
                            variant="outlined"
                            placeholder="Ej: Empresa XYZ, Startup ABC, etc."
                            fullWidth
                            size="small"
                            error={!!errors.testimonials?.[index]?.clientCompany}
                            helperText={errors.testimonials?.[index]?.clientCompany?.message}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px'
                                },
                                '& .MuiFormHelperText-root': {
                                    color: '#ff5252',
                                    marginLeft: '15px',
                                    fontSize: '12px'
                                }
                            }}
                        />
                    </Box>
                )}
            />

            <Controller
                name={`testimonials.${index}.image`}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Box className="form-field">
                        <label className="input-label">
                            Foto del cliente (opcional)
                        </label>
                        <Box className="image-upload-container" sx={{
                            border: '2px dashed rgba(255, 255, 255, 0.2)',
                            borderRadius: '8px',
                            padding: '1rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                borderColor: '#F9DF88',
                                backgroundColor: 'rgba(249, 223, 136, 0.05)'
                            }
                        }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(index, e, onChange, updateStageFiles)}
                                id={`testimonial-image-${index}`}
                                style={{ display: 'none' }}
                            />
                            <label
                                htmlFor={`testimonial-image-${index}`}
                                style={{ cursor: 'pointer', display: 'block' }}
                            >
                                <Typography className="image-upload-text" sx={{
                                    fontSize: '14px',
                                    color: value ? '#F9DF88' : 'rgba(255, 255, 255, 0.7)'
                                }}>
                                    {value ? `✓ ${value}` : '📸 Seleccionar foto del cliente'}
                                </Typography>
                                {!value && (
                                    <Typography variant="caption" sx={{
                                        display: 'block',
                                        color: 'rgba(255, 255, 255, 0.5)',
                                        marginTop: '0.5rem',
                                        fontSize: '12px'
                                    }}>
                                        Haz clic para subir una imagen
                                    </Typography>
                                )}
                            </label>
                        </Box>
                        {errors.testimonials?.[index]?.image && (
                            <Typography variant="caption" sx={{
                                color: '#ff5252',
                                marginLeft: '15px',
                                fontSize: '12px',
                                display: 'block',
                                marginTop: '4px'
                            }}>
                                {errors.testimonials?.[index]?.image?.message}
                            </Typography>
                        )}
                    </Box>
                )}
            />
        </>
    )
}

export default ClientForm
