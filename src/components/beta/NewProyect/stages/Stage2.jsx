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

function Stage2() {
  const { control, formState: { errors } } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products'
  })

  const addProduct = () => {
    if (fields.length < 4) {
      append({
        name: '',
        description: '',
        image: null
      })
    }
  }

  const removeProduct = (index) => {
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
        Productos y Servicios
      </Typography>
      <Typography variant="body1" className="stage-description">
        Agrega hasta 4 productos o servicios que ofrece tu empresa
      </Typography>

      <Box>
        {fields.length === 0 && (
          <Typography sx={{ 
            color: 'rgba(255, 255, 255, 0.6)', 
            textAlign: 'center', 
            fontStyle: 'italic',
            marginBottom: '1rem' 
          }}>
            Aún no has agregado productos o servicios
          </Typography>
        )}

        {fields.map((field, index) => (
          <Box key={field.id} className="dynamic-section">
            <Box className="dynamic-section-header">
              <Typography className="section-number">
                {`Producto/Servicio ${index + 1}`}
              </Typography>
              <IconButton
                onClick={() => removeProduct(index)}
                className="remove-button"
                size="small"
              >
                <RemoveIcon />
              </IconButton>
            </Box>

            <Controller
              name={`products.${index}.name`}
              control={control}
              rules={{ 
                required: 'El nombre del producto/servicio es requerido',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
              }}
              render={({ field }) => (
                <Box className="form-field">
                  <label className="input-label">
                    Nombre del producto o servicio
                  </label>
                  <TextField
                    {...field}
                    variant="outlined"
                    placeholder="Ej: Desarrollo Web, Consultoría, etc."
                    fullWidth
                    error={!!errors.products?.[index]?.name}
                    helperText={errors.products?.[index]?.name?.message}
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
              name={`products.${index}.description`}
              control={control}
              rules={{ 
                required: 'La descripción es requerida',
                minLength: { value: 10, message: 'Mínimo 10 caracteres' },
                maxLength: { value: 200, message: 'Máximo 200 caracteres' }
              }}
              render={({ field }) => (
                <Box className="form-field">
                  <label className="input-label">
                    Descripción corta
                  </label>
                  <TextField
                    {...field}
                    variant="outlined"
                    placeholder="Describe brevemente este producto o servicio..."
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.products?.[index]?.description}
                    helperText={errors.products?.[index]?.description?.message}
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
              name={`products.${index}.image`}
              control={control}
              rules={{ 
                required: 'La imagen es requerida'
              }}
              render={({ field: { onChange, value } }) => (
                <Box className="form-field">
                  <label className="input-label">
                    Imagen del producto/servicio
                  </label>
                  <Box className="image-upload-container">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(index, e, onChange)}
                      id={`product-image-${index}`}
                    />
                    <label htmlFor={`product-image-${index}`}>
                      <Typography className="image-upload-text">
                        {value ? `Imagen seleccionada: ${value}` : 'Haz clic para seleccionar una imagen'}
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
                  {errors.products?.[index]?.image && (
                    <Typography variant="caption" sx={{ 
                      color: '#ff5252', 
                      marginLeft: '15px', 
                      fontSize: '14px',
                      display: 'block',
                      marginTop: '4px'
                    }}>
                      {errors.products?.[index]?.image?.message}
                    </Typography>
                  )}
                </Box>
              )}
            />
          </Box>
        ))}

        {fields.length < 4 ? (
          <Button
            onClick={addProduct}
            className="add-more-button"
            startIcon={<AddIcon />}
            variant="outlined"
          >
            {fields.length === 0 
              ? 'Agregar primer producto/servicio' 
              : `Agregar otro producto/servicio (${fields.length}/4)`
            }
          </Button>
        ) : (
          <Typography className="max-reached-text">
            Máximo de productos/servicios alcanzado (4/4)
          </Typography>
        )}

        {fields.length === 0 && (
          <Typography sx={{ 
            color: 'rgba(255, 82, 82, 0.8)', 
            fontSize: '14px',
            textAlign: 'center',
            marginTop: '1rem' 
          }}>
            * Debes agregar al menos un producto o servicio para continuar
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default Stage2