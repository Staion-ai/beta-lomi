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
import CheckIcon from '@mui/icons-material/Check'

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
                        size="small"
                        sx={{
                            backgroundColor: colorValue,
                            color: '#ffffff',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            height: '24px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                            '& .MuiChip-label': {
                                paddingLeft: '8px',
                                paddingRight: '8px'
                            }
                        }}
                    />
                )
            })}
        </Box>
    )

    const renderColorMenuItem = (color, isSelected, isDisabled) => (
        <MenuItem
            key={color.value}
            value={color.value}
            disabled={isDisabled}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                padding: '12px 16px',
                backgroundColor: isSelected ? color.value + '15' : 'transparent',
                borderLeft: isSelected ? `4px solid ${color.value}` : '4px solid transparent',
                '&:hover': {
                    backgroundColor: color.value + '10'
                },
                '&.Mui-disabled': {
                    opacity: 0.5
                }
            }}
        >
            <Box
                sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: color.value,
                    borderRadius: '50%',
                    border: '3px solid #fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}
            >
                {isSelected && (
                    <CheckIcon
                        sx={{
                            color: '#fff',
                            fontSize: 20,
                            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))'
                        }}
                    />
                )}
            </Box>
            <Box sx={{ flex: 1 }}>
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: isSelected ? 600 : 400,
                        color: isSelected ? color.value : '#333'
                    }}
                >
                    {color.label}
                </Typography>
                {isSelected && (
                    <Typography
                        variant="caption"
                        sx={{
                            color: color.value,
                            fontSize: '0.7rem'
                        }}
                    >
                        Seleccionado
                    </Typography>
                )}
            </Box>
            {isSelected && (
                <CheckIcon sx={{ color: color.value, fontSize: 20 }} />
            )}
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
                        Elige los colores que representen tu marca (máximo 3) *
                    </label>
                    <Typography variant="caption" sx={{
                        color: '#666',
                        fontSize: '0.75rem',
                        display: 'block',
                        marginBottom: '8px'
                    }}>
                        Selecciona desde el menú desplegable
                    </Typography>
                    <FormControl fullWidth error={!!errors.colors}>
                        <Select
                            multiple
                            value={value}
                            onChange={onChange}
                            input={<OutlinedInput />}
                            renderValue={renderColorChips}
                            displayEmpty
                            sx={{
                                '& .MuiSelect-select': {
                                    padding: '12px 14px',
                                    minHeight: '20px'
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: value.length > 0 ? '#4caf50' : '#ddd'
                                }
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        maxHeight: 400,
                                        '& .MuiMenuItem-root': {
                                            padding: 0
                                        }
                                    }
                                }
                            }}
                        >
                            {value.length === 0 && (
                                <MenuItem disabled sx={{ fontStyle: 'italic', color: '#999' }}>
                                    Selecciona hasta 3 colores para tu marca
                                </MenuItem>
                            )}
                            {colorOptions.map((color) => {
                                const isSelected = value.includes(color.value)
                                const isDisabled = value.length >= 3 && !isSelected

                                return renderColorMenuItem(color, isSelected, isDisabled)
                            })}
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
