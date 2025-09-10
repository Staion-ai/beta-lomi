import React from 'react'
import { useFormContext, Controller, useWatch } from 'react-hook-form'
import {
    Box,
    Typography,
    TextField
} from '@mui/material'

function SocialNetworkLinksField() {
    const { control, formState: { errors } } = useFormContext()

    const selectedNetworks = useWatch({
        control,
        name: 'socialNetworks',
        defaultValue: []
    })

    if (!selectedNetworks || selectedNetworks.length === 0) {
        return null
    }

    return (
        <Box className="form-field">
            <Typography
                variant="h6"
                component="h3"
                sx={{
                    marginBottom: 2,
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#333'
                }}
            >
                Enlaces de Redes Sociales
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    marginBottom: 2,
                    color: '#666',
                    fontSize: '0.875rem'
                }}
            >
                Ingresa los enlaces de las redes sociales que seleccionaste
            </Typography>

            {selectedNetworks.map((network) => (
                <Controller
                    key={network}
                    name={`socialNetworkLinks.${network}`}
                    control={control}
                    rules={{
                        required: `El enlace de ${network} es obligatorio`,
                        pattern: {
                            value: /^https?:\/\/.+/,
                            message: `El enlace de ${network} debe ser una URL válida (comenzar con http:// o https://)`
                        }
                    }}
                    render={({ field: { value = '', onChange } }) => (
                        <Box sx={{ marginBottom: 2 }}>
                            <label
                                htmlFor={`socialLink-${network}`}
                                className="input-label"
                            >
                                Enlace de {network} *
                            </label>
                            <TextField
                                id={`socialLink-${network}`}
                                fullWidth
                                value={value}
                                onChange={onChange}
                                placeholder={`https://www.${network.toLowerCase()}.com/tu-perfil`}
                                error={!!errors.socialNetworkLinks?.[network]}
                                helperText={errors.socialNetworkLinks?.[network]?.message}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#e0e0e0',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#b0b0b0',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        padding: '0.6rem 1rem',
                                        fontSize: '0.875rem'
                                    }
                                }}
                            />
                        </Box>
                    )}
                />
            ))}
        </Box>
    )
}

export default SocialNetworkLinksField
