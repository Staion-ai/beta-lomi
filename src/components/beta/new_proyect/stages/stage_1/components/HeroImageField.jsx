import React, { useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import {
    Box,
    Typography,
    Button,
    IconButton,
    Paper
} from '@mui/material'
import {
    CloudUpload as CloudUploadIcon,
    Delete as DeleteIcon,
    Image as ImageIcon
} from '@mui/icons-material'

function HeroImageField() {
    const { control, formState: { errors } } = useFormContext()
    const [preview, setPreview] = useState(null)

    const handleFileSelect = (onChange) => (event) => {
        const file = event.target.files[0]

        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Por favor, selecciona solo archivos de imagen')
                return
            }

            if (file.size > 5 * 1024 * 1024) {
                alert('El archivo es demasiado grande. Máximo 5MB permitido')
                return
            }

            const reader = new FileReader()
            reader.onload = (e) => {
                setPreview(e.target.result)
            }
            reader.readAsDataURL(file)

            onChange(file)
        }
    }

    const handleRemoveFile = (onChange) => () => {
        onChange(null)
        setPreview(null)
        const fileInput = document.getElementById('hero-upload')
        if (fileInput) {
            fileInput.value = ''
        }
    }

    return (
        <Controller
            name="heroImage"
            control={control}
            rules={{
                required: 'La imagen del hero es obligatoria'
            }}
            render={({ field: { value, onChange } }) => (
                <Box className="form-field image-field">
                    <label htmlFor="hero-upload" className="input-label">
                        Imagen del Hero *
                    </label>
                    <Typography variant="caption" sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.75rem',
                        display: 'block',
                        marginBottom: '12px'
                    }}>
                        Imagen principal para la sección hero (PNG, JPG - máx. 5MB)
                    </Typography>

                    {/* Preview de la imagen o área de carga */}
                    <Paper
                        variant="outlined"
                        className="image-upload-area"
                        sx={{
                            padding: 2,
                            textAlign: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            border: errors.heroImage ? '2px solid #ff5252' : '2px dashed rgba(255, 255, 255, 0.3)',
                            borderRadius: '20px',
                            minHeight: '120px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}
                    >
                        {(preview || value) ? (
                            <>
                                <Box sx={{
                                    position: 'relative',
                                    maxWidth: '100px',
                                    maxHeight: '80px',
                                    marginBottom: 1
                                }}>
                                    <img
                                        src={preview || (typeof value === 'string' ? value : '')}
                                        alt="Preview de imagen hero"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '80px',
                                            objectFit: 'contain',
                                            borderRadius: '4px'
                                        }}
                                    />
                                </Box>
                                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: 1 }}>
                                    {value?.name || 'Imagen hero seleccionada'}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        component="label"
                                        startIcon={<CloudUploadIcon />}
                                        sx={{
                                            fontSize: '0.75rem',
                                            color: 'rgba(255, 255, 255, 0.9)',
                                            borderColor: 'rgba(255, 255, 255, 0.3)',
                                            '&:hover': {
                                                borderColor: 'rgba(255, 255, 255, 0.5)',
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                            }
                                        }}
                                    >
                                        Cambiar
                                        <input
                                            id="hero-upload"
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={handleFileSelect(onChange)}
                                        />
                                    </Button>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={handleRemoveFile(onChange)}
                                        sx={{
                                            padding: '4px',
                                            color: '#ff5252',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 82, 82, 0.1)'
                                            }
                                        }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </>
                        ) : (
                            <>
                                <ImageIcon sx={{ fontSize: 40, color: 'rgba(255, 255, 255, 0.5)', marginBottom: 1 }} />
                                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: 2 }}>
                                    Arrastra tu imagen aquí o haz clic para seleccionar
                                </Typography>
                                <Button
                                    variant="contained"
                                    component="label"
                                    startIcon={<CloudUploadIcon />}
                                    sx={{
                                        backgroundColor: '#F9DF88',
                                        color: '#41475D',
                                        borderRadius: '20px',
                                        '&:hover': {
                                            backgroundColor: '#F7D774'
                                        }
                                    }}
                                >
                                    Seleccionar Imagen
                                    <input
                                        id="hero-upload"
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleFileSelect(onChange)}
                                    />
                                </Button>
                            </>
                        )}
                    </Paper>

                    {errors.heroImage && (
                        <Typography variant="caption" sx={{
                            color: '#ff5252',
                            fontSize: '14px',
                            display: 'block',
                            marginTop: '4px',
                            marginLeft: '15px'
                        }}>
                            {errors.heroImage.message}
                        </Typography>
                    )}
                </Box>
            )}
        />
    )
}

export default HeroImageField
