import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { 
  Box, 
  TextField, 
  Typography, 
  FormControl, 
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput
} from '@mui/material'

const colorOptions = [
  { value: '#FF5733', label: 'Rojo Vibrante' },
  { value: '#33FF57', label: 'Verde Brillante' },
  { value: '#3357FF', label: 'Azul Intenso' },
  { value: '#FF33F5', label: 'Magenta' },
  { value: '#33FFF5', label: 'Cian' },
  { value: '#F5FF33', label: 'Amarillo Lima' },
  { value: '#FF8533', label: 'Naranja' },
  { value: '#8533FF', label: 'Púrpura' },
  { value: '#33FF85', label: 'Verde Menta' },
  { value: '#FF3385', label: 'Rosa Fuerte' },
  { value: '#85FF33', label: 'Verde Lima' },
  { value: '#3385FF', label: 'Azul Cielo' }
]

function Stage1() {
  const { control, formState: { errors } } = useFormContext()

  return (
    <Box className="stage-container">
      <Typography variant="h4" component="h2" className="stage-title">
        Información de tu Empresa
      </Typography>
      <Typography variant="body1" className="stage-description">
        Cuéntanos sobre tu empresa o marca personal
      </Typography>

      <Box>
        <Controller
          name="companyName"
          control={control}
          rules={{ 
            required: 'El nombre de la empresa es requerido',
            minLength: { value: 2, message: 'Mínimo 2 caracteres' }
          }}
          render={({ field }) => (
            <Box className="form-field">
              <label htmlFor="companyName" className="input-label">
                ¿Cómo se llama tu empresa o marca?
              </label>
              <TextField
                {...field}
                id="companyName"
                variant="outlined"
                placeholder="Ingresa el nombre de tu empresa"
                fullWidth
                error={!!errors.companyName}
                helperText={errors.companyName?.message}
                sx={{
                  '& .MuiFormHelperText-root': {
                    color: '#ff5252',
                    marginLeft: '15px',
                    fontSize: '14px'
                  }
                }}
              />
            </Box>
          )}
        />

        <Controller
          name="companyDescription"
          control={control}
          rules={{ 
            required: 'La descripción es requerida',
            minLength: { value: 10, message: 'Mínimo 10 caracteres' },
            maxLength: { value: 500, message: 'Máximo 500 caracteres' }
          }}
          render={({ field }) => (
            <Box className="form-field">
              <label htmlFor="companyDescription" className="input-label">
                Describe qué hace tu empresa y en qué área se desarrolla
              </label>
              <TextField
                {...field}
                id="companyDescription"
                variant="outlined"
                placeholder="Describe tu empresa, productos o servicios..."
                fullWidth
                multiline
                rows={4}
                error={!!errors.companyDescription}
                helperText={errors.companyDescription?.message}
                sx={{
                  '& .MuiFormHelperText-root': {
                    color: '#ff5252',
                    marginLeft: '15px',
                    fontSize: '14px'
                  }
                }}
              />
            </Box>
          )}
        />

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
                  renderValue={(selected) => (
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
                  )}
                  sx={{
                    '& .MuiSelect-select': {
                      padding: '0.6rem 1rem'
                    }
                  }}
                >
                  {colorOptions.map((color) => (
                    <MenuItem 
                      key={color.value} 
                      value={color.value}
                      disabled={value.length >= 3 && !value.includes(color.value)}
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
                  ))}
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
      </Box>
    </Box>
  )
}

export default Stage1