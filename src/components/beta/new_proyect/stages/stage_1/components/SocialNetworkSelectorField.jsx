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
import { socialNetworkOptions } from '../constants/stage1Constants'

function SocialNetworkSelectorField() {
    const { control, formState: { errors } } = useFormContext()

    const renderSocialChips = (selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((network) => (
                <Chip
                    key={network}
                    label={network}
                    className="color-chip"
                    size="small"
                    sx={{
                        backgroundColor: '#f0f0f0',
                        color: '#333',
                        border: '1px solid #ddd'
                    }}
                />
            ))}
        </Box>
    )

    return (
        <Controller
            name="socialNetworks"
            control={control}
            rules={{
                required: 'Selecciona al menos 2 redes sociales',
                validate: (value) => {
                    if (!value || value.length < 2) return 'Selecciona al menos 2 redes sociales'
                    if (value.length > 3) return 'Máximo 3 redes sociales permitidas'
                    return true
                }
            }}
            render={({ field: { value = [], onChange } }) => (
                <Box className="form-field">
                    <label htmlFor="socialNetworks" className="input-label">
                        Selecciona las redes sociales de tu empresa (mínimo 2, máximo 3)
                    </label>
                    <FormControl fullWidth error={!!errors.socialNetworks}>
                        <Select
                            multiple
                            value={value}
                            onChange={onChange}
                            input={<OutlinedInput />}
                            renderValue={renderSocialChips}
                            sx={{
                                '& .MuiSelect-select': {
                                    padding: '0.6rem 1rem'
                                }
                            }}
                        >
                            {socialNetworkOptions.map((network) => (
                                <MenuItem
                                    key={network}
                                    value={network}
                                    disabled={value.length >= 3 && !value.includes(network)}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}
                                >
                                    {network}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.socialNetworks && (
                            <Typography variant="caption" sx={{
                                color: '#ff5252',
                                marginLeft: '15px',
                                fontSize: '14px',
                                display: 'block',
                                marginTop: '4px'
                            }}>
                                {errors.socialNetworks.message}
                            </Typography>
                        )}
                    </FormControl>
                </Box>
            )}
        />
    )
}

export default SocialNetworkSelectorField
