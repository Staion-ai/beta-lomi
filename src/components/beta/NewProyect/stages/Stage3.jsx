import React from 'react'
import { useFormContext, useFieldArray, Controller } from 'react-hook-form'
import { 
  Box, 
  TextField, 
  Typography, 
  Button, 
  IconButton
} from '@mui/material'
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material'

function Stage3() {
  const { control, formState: { errors } } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'testimonials'
  })

  const addTestimonial = () => {
    if (fields.length < 4) {
      append({
        clientName: '',
        clientCompany: '',
        testimonial: '',
        image: null
      })
    }
  }

  const removeTestimonial = (index) => {
    remove(index)
  }

  const handleImageUpload = (index, event, onChange) => {
    const file = event.target.files[0]
    if (file) {
      // For now, we'll store the file name. In a real app, you'd upload to a server
      onChange(file.name)
    }
  }

  return (
    <Box className="stage-container">
      <Typography variant="h4" component="h2" className="stage-title">
        Testimonios de Clientes
      </Typography>
      <Typography variant="body1" className="stage-description">
        Agrega hasta 4 testimonios de tus clientes satisfechos
      </Typography>

      <Box>
        {fields.length === 0 && (
          <Typography sx={{ 
            color: 'rgba(255, 255, 255, 0.6)', 
            textAlign: 'center', 
            fontStyle: 'italic',
            marginBottom: '1rem' 
          }}>
            Aún no has agregado testimonios
          </Typography>
        )}

        {fields.map((field, index) => (
          <Box key={field.id} className="dynamic-section">
            <Box className="dynamic-section-header">
              <Typography className="section-number">
                {`Testimonio ${index + 1}`}
              </Typography>
              <IconButton
                onClick={() => removeTestimonial(index)}
                className="remove-button"
                size="small"
              >
                <RemoveIcon />
              </IconButton>
            </Box>

            <Controller
              name={`testimonials.${index}.clientName`}
              control={control}
              rules={{ 
                required: 'El nombre del cliente es requerido',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
              }}
              render={({ field }) => (
                <Box className="form-field">
                  <label className="input-label">
                    Nombre del cliente
                  </label>
                  <TextField
                    {...field}
                    variant="outlined"
                    placeholder="Ej: Juan Pérez, María García, etc."
                    fullWidth
                    error={!!errors.testimonials?.[index]?.clientName}
                    helperText={errors.testimonials?.[index]?.clientName?.message}
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
              name={`testimonials.${index}.clientCompany`}
              control={control}
              rules={{ 
                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
              }}
              render={({ field }) => (
                <Box className="form-field">
                  <label className="input-label">
                    Empresa del cliente (opcional)
                  </label>
                  <TextField
                    {...field}
                    variant="outlined"
                    placeholder="Ej: Tech Solutions, Marketing Pro, etc."
                    fullWidth
                    error={!!errors.testimonials?.[index]?.clientCompany}
                    helperText={errors.testimonials?.[index]?.clientCompany?.message}
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
              name={`testimonials.${index}.testimonial`}
              control={control}
              rules={{ 
                required: 'El testimonio es requerido',
                minLength: { value: 20, message: 'Mínimo 20 caracteres' },
                maxLength: { value: 400, message: 'Máximo 400 caracteres' }
              }}
              render={({ field }) => (
                <Box className="form-field">
                  <label className="input-label">
                    Testimonio del cliente
                  </label>
                  <TextField
                    {...field}
                    variant="outlined"
                    placeholder="Escribe aquí el testimonio completo del cliente..."
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors.testimonials?.[index]?.testimonial}
                    helperText={errors.testimonials?.[index]?.testimonial?.message}
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
              name={`testimonials.${index}.image`}
              control={control}
              rules={{ 
                required: 'La imagen del cliente es requerida'
              }}
              render={({ field: { onChange, value } }) => (
                <Box className="form-field">
                  <label className="input-label">
                    Foto del cliente
                  </label>
                  <Box className="image-upload-container">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(index, e, onChange)}
                      id={`testimonial-image-${index}`}
                    />
                    <label htmlFor={`testimonial-image-${index}`}>
                      <Typography className="image-upload-text">
                        {value ? `Imagen seleccionada: ${value}` : 'Haz clic para seleccionar una foto del cliente'}
                      </Typography>
                      {value && (
                        <Typography variant="caption" sx={{ 
                          display: 'block', 
                          color: '#F9DF88', 
                          marginTop: '0.5rem' 
                        }}>
                          ✓ Imagen cargada
                        </Typography>
                      )}
                    </label>
                  </Box>
                  {errors.testimonials?.[index]?.image && (
                    <Typography variant="caption" sx={{ 
                      color: '#ff5252', 
                      marginLeft: '15px', 
                      fontSize: '14px',
                      display: 'block',
                      marginTop: '4px'
                    }}>
                      {errors.testimonials?.[index]?.image?.message}
                    </Typography>
                  )}
                </Box>
              )}
            />
          </Box>
        ))}

        {fields.length < 4 ? (
          <Button
            onClick={addTestimonial}
            className="add-more-button"
            startIcon={<AddIcon />}
            variant="outlined"
          >
            {fields.length === 0 
              ? 'Agregar primer testimonio' 
              : `Agregar otro testimonio (${fields.length}/4)`
            }
          </Button>
        ) : (
          <Typography className="max-reached-text">
            Máximo de testimonios alcanzado (4/4)
          </Typography>
        )}

        {fields.length === 0 && (
          <Typography sx={{ 
            color: 'rgba(255, 82, 82, 0.8)', 
            fontSize: '14px',
            textAlign: 'center',
            marginTop: '1rem' 
          }}>
            * Debes agregar al menos un testimonio para continuar
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default Stage3