import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import {
    Box,
    Typography,
    FormControl,
    Select,
    MenuItem,
    Chip,
    OutlinedInput
} from '@mui/material'
import { colorOptions } from '../constants/stage1Constants'

function ColorSelectorField() {
    const { control, formState: { errors } } = useFormContext()

    const renderColorChips = (selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((colorValue) => {
                const colorOption = colorOptions.find(option => option.value === colorValue)
                return (
                    <Chip
                        key={colorValue}
                        label={colorOption?.label || colorValue}
                        className="color-chip"
                        size="small"
                        style={{
                            backgroundColor: colorValue,
                            color: '#ffffff',
                            border: `2px solid ${colorValue}`
                        }}
                    />
                )
            })}
        </Box>
    )

    const renderColorMenuItem = (color, isDisabled) => (
        <MenuItem
            key={color.value}
            value={color.value}
            disabled={isDisabled}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}
        >
            <Box
                sx={{
                    width: 20,
                    height: 20,
                    backgroundColor: color.value,
                    borderRadius: '50%',
                    border: '2px solid #fff',
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.1)'
                }}
            />
            {color.label}
        </MenuItem>
    )

    return (
        <Controller
            name="colors"
            control={control}
            rules={{
                required: 'Selecciona al menos un color',
                validate: (value) => {
                    if (value.length === 0) return 'Selecciona al menos un color'
                    if (value.length > 3) return 'Máximo 3 colores permitidos'
                    return true
                }
            }}
            render={({ field: { value = [], onChange } }) => (
                <Box className="form-field">
                    <label htmlFor="colors" className="input-label">
                        Elige los colores que representen tu marca (máximo 3)
                    </label>
                    <FormControl fullWidth error={!!errors.colors}>
                        <Select
                            multiple
                            value={value}
                            onChange={onChange}
                            input={<OutlinedInput />}
                            renderValue={renderColorChips}
                            sx={{
                                '& .MuiSelect-select': {
                                    padding: '0.6rem 1rem'
                                }
                            }}
                        >
                            {colorOptions.map((color) =>
                                renderColorMenuItem(
                                    color,
                                    value.length >= 3 && !value.includes(color.value)
                                )
                            )}
                        </Select>
                        {errors.colors && (
                            <Typography variant="caption" sx={{
                                color: '#ff5252',
                                marginLeft: '15px',
                                fontSize: '14px',
                                display: 'block',
                                marginTop: '4px'
                            }}>
                                {errors.colors.message}
                            </Typography>
                        )}
                    </FormControl>
                </Box>
            )}
        />
    )
}

export default ColorSelectorField
