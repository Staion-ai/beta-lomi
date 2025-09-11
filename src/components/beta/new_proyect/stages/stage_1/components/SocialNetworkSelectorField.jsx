import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import {
    Box,
    Typography,
    FormControl,
    Select,
    MenuItem,
    Chip,
    OutlinedInput,
    Avatar
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { socialNetworkOptions } from '../constants/stage1Constants'
import { FaTiktok } from 'react-icons/fa'

function SocialNetworkSelectorField() {
    const { control, formState: { errors }, setValue, watch } = useFormContext()
    const currentSocialNetworkLinks = watch('socialNetworkLinks') || {}

    // Iconos y colores para cada red social
    const socialNetworkConfig = {
        'Facebook': {
            icon: FacebookIcon,
            color: '#1877F2',
            bgColor: '#E3F2FD'
        },
        'Twitter': {
            icon: TwitterIcon,
            color: '#1DA1F2',
            bgColor: '#E1F5FE'
        },
        'Instagram': {
            icon: InstagramIcon,
            color: '#E4405F',
            bgColor: '#FCE4EC'
        },
        'LinkedIn': {
            icon: LinkedInIcon,
            color: '#0A66C2',
            bgColor: '#E3F2FD'
        },
        'YouTube': {
            icon: YouTubeIcon,
            color: '#FF0000',
            bgColor: '#FFEBEE'
        },
        'TikTok': {
            icon: FaTiktok,
            color: '#000000',
            bgColor: '#F5F5F5'
        }
    }

    const renderSocialChips = (selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((network) => {
                const config = socialNetworkConfig[network]
                const IconComponent = config?.icon

                return (
                    <Chip
                        key={network}
                        avatar={
                            <Avatar sx={{
                                backgroundColor: config?.color || '#666',
                                color: '#fff',
                                width: 20,
                                height: 20
                            }}>
                                {IconComponent ? (
                                    typeof IconComponent === 'function' && network === 'TikTok' ?
                                        <Typography sx={{ fontSize: 12 }}>{IconComponent()}</Typography> :
                                        <IconComponent sx={{ fontSize: 12 }} />
                                ) : network[0]}
                            </Avatar>
                        }
                        label={network}
                        size="small"
                        sx={{
                            backgroundColor: config?.bgColor || '#f0f0f0',
                            color: config?.color || '#333',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            height: '24px',
                            border: `1px solid ${config?.color || '#ddd'}`,
                            '& .MuiChip-avatar': {
                                marginLeft: '4px'
                            },
                            '& .MuiChip-label': {
                                paddingLeft: '4px',
                                paddingRight: '8px'
                            }
                        }}
                    />
                )
            })}
        </Box>
    )

    const renderSocialMenuItem = (network, isSelected, isDisabled) => {
        const config = socialNetworkConfig[network]
        const IconComponent = config?.icon

        return (
            <MenuItem
                key={network}
                value={network}
                disabled={isDisabled}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    padding: '12px 16px',
                    backgroundColor: isSelected ? config?.bgColor : 'transparent',
                    borderLeft: isSelected ? `4px solid ${config?.color}` : '4px solid transparent',
                    '&:hover': {
                        backgroundColor: config?.bgColor || '#f5f5f5'
                    },
                    '&.Mui-disabled': {
                        opacity: 0.5
                    }
                }}
            >
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: config?.color || '#666',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        position: 'relative'
                    }}
                >
                    {IconComponent ? (
                        typeof IconComponent === 'function' && network === 'TikTok' ?
                            <Typography sx={{ fontSize: 20 }}>{IconComponent()}</Typography> :
                            <IconComponent sx={{ fontSize: 24 }} />
                    ) : (
                        <Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>
                            {network[0]}
                        </Typography>
                    )}
                    {isSelected && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: -4,
                                right: -4,
                                width: 16,
                                height: 16,
                                backgroundColor: '#4caf50',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid #fff'
                            }}
                        >
                            <CheckIcon sx={{ fontSize: 10, color: '#fff' }} />
                        </Box>
                    )}
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: isSelected ? 600 : 400,
                            color: isSelected ? config?.color : '#333'
                        }}
                    >
                        {network}
                    </Typography>
                    {isSelected && (
                        <Typography
                            variant="caption"
                            sx={{
                                color: config?.color,
                                fontSize: '0.7rem'
                            }}
                        >
                            Seleccionado
                        </Typography>
                    )}
                </Box>
                {isSelected && (
                    <CheckIcon sx={{ color: config?.color, fontSize: 20 }} />
                )}
            </MenuItem>
        )
    }

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
            render={({ field: { value = [], onChange } }) => {
                const handleSocialNetworkChange = (newValue) => {
                    onChange(newValue)

                    const updatedLinks = { ...currentSocialNetworkLinks }

                    Object.keys(updatedLinks).forEach(network => {
                        if (!newValue.includes(network)) {
                            delete updatedLinks[network]
                        }
                    })

                    setValue('socialNetworkLinks', updatedLinks)
                }

                return (
                    <Box className="form-field">
                        <label htmlFor="socialNetworks" className="input-label">
                            Selecciona las redes sociales de tu empresa (mínimo 2, máximo 3) *
                        </label>
                        <Typography variant="caption" sx={{
                            color: '#666',
                            fontSize: '0.75rem',
                            display: 'block',
                            marginBottom: '8px'
                        }}>
                            Selecciona desde el menú desplegable. Después podrás agregar los enlaces específicos
                        </Typography>
                        <FormControl fullWidth error={!!errors.socialNetworks}>
                            <Select
                                multiple
                                value={value}
                                onChange={handleSocialNetworkChange}
                                input={<OutlinedInput />}
                                renderValue={renderSocialChips}
                                displayEmpty
                                sx={{
                                    '& .MuiSelect-select': {
                                        padding: '12px 14px',
                                        minHeight: '20px'
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: value.length >= 2 ? '#4caf50' : '#ddd'
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
                                    <MenuItem disabled sx={{ fontStyle: 'italic', color: '#999', padding: '12px 16px' }}>
                                        Selecciona entre 2 y 3 redes sociales para tu empresa
                                    </MenuItem>
                                )}
                                {socialNetworkOptions.map((network) => {
                                    const isSelected = value.includes(network)
                                    const isDisabled = value.length >= 3 && !isSelected

                                    return renderSocialMenuItem(network, isSelected, isDisabled)
                                })}
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
                )
            }}
        />
    )
}

export default SocialNetworkSelectorField
