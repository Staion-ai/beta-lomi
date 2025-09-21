import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Box, TextField, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material'
import { useStage1Context } from '../context/Stage1Context'

function PhoneField() {
    const { control, formState: { errors }, watch } = useFormContext()
    const { shouldEnableOtherFields } = useStage1Context()

    // Lista de países de Latinoamérica, Estados Unidos y Canadá
    const countryCodes = [
        // { code: '+1', country: 'Estados Unidos', flag: '🇺🇸' },
        // { code: '+1', country: 'Canadá', flag: '🇨🇦' },
        // { code: '+52', country: 'México', flag: '🇲🇽' },
        // { code: '+502', country: 'Guatemala', flag: '🇬🇹' },
        // { code: '+503', country: 'El Salvador', flag: '🇸🇻' },
        // { code: '+505', country: 'Nicaragua', flag: '🇳🇮' },
        // { code: '+506', country: 'Costa Rica', flag: '🇨🇷' },
        // { code: '+507', country: 'Panamá', flag: '🇵🇦' },
        // { code: '+1-809', country: 'República Dominicana', flag: '🇩🇴' },
        // { code: '+1-876', country: 'Jamaica', flag: '🇯🇲' },
        // { code: '+54', country: 'Argentina', flag: '🇦🇷' },
        // { code: '+55', country: 'Brasil', flag: '🇧🇷' },
        // { code: '+56', country: 'Chile', flag: '🇨🇱' },
        { code: '+57', country: 'Colombia', flag: '🇨🇴' },
        // { code: '+593', country: 'Ecuador', flag: '🇪🇨' },
        // { code: '+595', country: 'Paraguay', flag: '🇵🇾' },
        // { code: '+51', country: 'Perú', flag: '🇵🇪' },
        // { code: '+598', country: 'Uruguay', flag: '🇺🇾' },
    ]

    const selectedCountryCode = watch('phone_country_code')

    const validatePhoneNumber = (value, countryCode) => {
        if (!value) return 'El número de teléfono es requerido'

        // Remover espacios y guiones
        const cleanNumber = value.replace(/[\s-]/g, '')

        // Validar que solo contenga números
        if (!/^\d+$/.test(cleanNumber)) {
            return 'El número solo debe contener dígitos'
        }

        // Validaciones específicas por región
        let minLength, maxLength

        if (countryCode === '+1' || countryCode.startsWith('+1-')) {
            // Estados Unidos, Canadá y países del Caribe con +1
            minLength = 10
            maxLength = 10
        } else if (['+52', '+54', '+55', '+56', '+57'].includes(countryCode)) {
            // México, Argentina, Brasil, Chile, Colombia
            minLength = 10
            maxLength = 11
        } else if (['+51', '+58', '+593', '+591', '+595', '+598'].includes(countryCode)) {
            // Perú, Venezuela, Ecuador, Bolivia, Paraguay, Uruguay
            minLength = 8
            maxLength = 9
        } else {
            // Otros países de Centroamérica y el Caribe
            minLength = 7
            maxLength = 8
        }

        if (cleanNumber.length < minLength) {
            return `El número debe tener al menos ${minLength} dígitos`
        }

        if (cleanNumber.length > maxLength) {
            return `El número debe tener máximo ${maxLength} dígitos`
        }

        return true
    }

    return (
        <Box className="form-field">
            <label className="input-label">
                ¿Cuál es tu número de teléfono de contacto? *
            </label>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                {/* Selector de país */}
                <FormControl
                    sx={{ minWidth: 200 }}
                    error={!!errors.phone_country_code}
                >
                    <InputLabel id="country-code-label">País</InputLabel>
                    <Controller
                        name="phone_country_code"
                        control={control}
                        defaultValue="+57"
                        rules={{
                            required: 'Selecciona un país'
                        }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                labelId="country-code-label"
                                label="País"
                                size="medium"
                                disabled={!shouldEnableOtherFields}
                            >
                                {countryCodes.map((country) => (
                                    <MenuItem key={country.code} value={country.code}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <span>{country.flag}</span>
                                            <span>{country.code}</span>
                                            <span style={{ fontSize: '0.875rem', color: '#666' }}>
                                                {country.country}
                                            </span>
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                    {errors.phone_country_code && (
                        <FormHelperText sx={{ color: '#ff5252', marginLeft: '15px', fontSize: '14px' }}>
                            {errors.phone_country_code.message}
                        </FormHelperText>
                    )}
                </FormControl>

                {/* Campo de número de teléfono */}
                <Controller
                    name="phone_number"
                    control={control}
                    rules={{
                        validate: (value) => validatePhoneNumber(value, selectedCountryCode)
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            variant="outlined"
                            placeholder="123 456 7890"
                            fullWidth
                            disabled={!shouldEnableOtherFields}
                            error={!!errors.phone_number}
                            helperText={errors.phone_number?.message}
                            sx={{
                                '& .MuiFormHelperText-root': {
                                    color: '#ff5252',
                                    marginLeft: '15px',
                                    fontSize: '14px'
                                }
                            }}
                            onChange={(e) => {
                                // Permitir solo números, espacios y guiones
                                const value = e.target.value.replace(/[^\d\s-]/g, '')
                                field.onChange(value)
                            }}
                        />
                    )}
                />
            </Box>

            <Box sx={{ mt: 1, fontSize: '0.875rem', color: '#666' }}>
                El número completo será: {selectedCountryCode} {watch('phone_number') || 'XXX XXX XXXX'}
            </Box>
        </Box>
    )
}

export default PhoneField