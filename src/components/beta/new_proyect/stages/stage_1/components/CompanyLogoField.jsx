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

function CompanyLogoField() {
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
        const fileInput = document.getElementById('logo-upload')
        if (fileInput) {
            fileInput.value = ''
        }
    }

    return (
        <Controller
            name="logo"
            control={control}
            rules={{
                required: 'El logo de la empresa es obligatorio'
            }}
            render={({ field: { value, onChange } }) => (
                <Box className="form-field">
                    <label htmlFor="logo-upload" className="input-label">
                        Logo de la Empresa *
                    </label>
                    <Typography variant="caption" sx={{
                        color: '#666',
                        fontSize: '0.75rem',
                        display: 'block',
                        marginBottom: '12px'
                    }}>
                        Sube el logo de tu empresa (PNG, JPG, SVG - máx. 5MB)
                    </Typography>

                    {/* Preview del logo o área de carga */}
                    <Paper
                        variant="outlined"
                        sx={{
                            padding: 2,
                            textAlign: 'center',
                            backgroundColor: '#fafafa',
                            border: errors.logo ? '2px solid #ff5252' : '2px dashed #e0e0e0',
                            borderRadius: '8px',
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
                                        alt="Preview del logo"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '80px',
                                            objectFit: 'contain',
                                            borderRadius: '4px'
                                        }}
                                    />
                                </Box>
                                <Typography variant="caption" sx={{ color: '#666', marginBottom: 1 }}>
                                    {value?.name || 'Logo seleccionado'}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        component="label"
                                        startIcon={<CloudUploadIcon />}
                                        sx={{ fontSize: '0.75rem' }}
                                    >
                                        Cambiar
                                        <input
                                            id="logo-upload"
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
                                        sx={{ padding: '4px' }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </>
                        ) : (
                            <>
                                <ImageIcon sx={{ fontSize: 40, color: '#bbb', marginBottom: 1 }} />
                                <Typography variant="body2" sx={{ color: '#666', marginBottom: 2 }}>
                                    Arrastra tu logo aquí o haz clic para seleccionar
                                </Typography>
                                <Button
                                    variant="contained"
                                    component="label"
                                    startIcon={<CloudUploadIcon />}
                                    sx={{
                                        backgroundColor: '#1976d2',
                                        '&:hover': {
                                            backgroundColor: '#1565c0'
                                        }
                                    }}
                                >
                                    Seleccionar Logo
                                    <input
                                        id="logo-upload"
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleFileSelect(onChange)}
                                    />
                                </Button>
                            </>
                        )}
                    </Paper>

                    {errors.logo && (
                        <Typography variant="caption" sx={{
                            color: '#ff5252',
                            fontSize: '14px',
                            display: 'block',
                            marginTop: '4px',
                            marginLeft: '15px'
                        }}>
                            {errors.logo.message}
                        </Typography>
                    )}
                </Box>
            )}
        />
    )
}

export default CompanyLogoField
