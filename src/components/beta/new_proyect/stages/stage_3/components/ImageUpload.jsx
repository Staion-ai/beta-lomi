import React from 'react'
import { Box, Typography } from '@mui/material'

function ImageUpload({
    index,
    value,
    onChange,
    error,
    onImageUpload
}) {
    const handleImageUpload = (event) => {
        const file = event.target.files[0]
        if (file) {
            onChange(file.name)
            if (onImageUpload) {
                onImageUpload(index, file)
            }
        }
    }

    return (
        <Box className="form-field">
            <label className="input-label">
                Imagen del producto/servicio
            </label>
            <Box className="image-upload-container">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    id={`product-image-${index}`}
                />
                <label htmlFor={`product-image-${index}`}>
                    <Typography className="image-upload-text">
                        {value ? `Imagen seleccionada: ${value}` : 'Haz clic para seleccionar una imagen'}
                    </Typography>
                    {value && (
                        <Typography variant="caption" sx={{
                            display: 'block',
                            color: '#F9DF88',
                            marginTop: '0.5rem'
                        }}>
                            ✓ Imagen cargada
                        </Typography>
                    )}
                </label>
            </Box>
            {error && (
                <Typography variant="caption" sx={{
                    color: '#ff5252',
                    marginLeft: '15px',
                    fontSize: '14px',
                    display: 'block',
                    marginTop: '4px'
                }}>
                    {error.message}
                </Typography>
            )}
        </Box>
    )
}

export default ImageUpload
