import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import {
    Box,
    Typography,
    FormControl,
    Select,
    MenuItem
} from '@mui/material'
import { fontOptions } from '../constants/stage1Constants'

function TypographySelectorField() {
    const { control, formState: { errors } } = useFormContext()

    return (
        <Controller
            name="typography"
            control={control}
            rules={{
                required: 'Selecciona una tipografía'
            }}
            render={({ field }) => (
                <Box className="form-field">
                    <label htmlFor="typography" className="input-label">
                        Selecciona la tipografía principal para tu marca *
                    </label>
                    <FormControl fullWidth error={!!errors.typography}>
                        <Select
                            {...field}
                            value={field.value || ''}
                            displayEmpty
                            sx={{
                                '& .MuiSelect-select': {
                                    padding: '0.6rem 1rem'
                                }
                            }}
                        >
                            <MenuItem value="" disabled>
                                Selecciona una tipografía
                            </MenuItem>
                            {fontOptions.map((font) => (
                                <MenuItem
                                    key={font}
                                    value={font}
                                    sx={{
                                        fontFamily: font,
                                        fontSize: '16px'
                                    }}
                                >
                                    {font}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.typography && (
                            <Typography variant="caption" sx={{
                                color: '#ff5252',
                                marginLeft: '15px',
                                fontSize: '14px',
                                display: 'block',
                                marginTop: '4px'
                            }}>
                                {errors.typography.message}
                            </Typography>
                        )}
                    </FormControl>
                </Box>
            )}
        />
    )
}

export default TypographySelectorField
