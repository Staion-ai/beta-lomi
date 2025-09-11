import React, { useState } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  Link
} from '@mui/material'
import { PersonAdd as RegisterIcon } from '@mui/icons-material'
import { useRegisterUser } from '../hooks/useRegisterUser'
import { useAuth } from '../contexts/useAuth'

function Register() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    celphone: '',
    email: '',
    password1: '',
    password2: '',
    privacyPolicy: false,
    marketingConsent: false
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const registerMutation = useRegisterUser()
  const { login } = useAuth()

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Limpiar mensajes al escribir
    if (error) setError('')
    if (success) setSuccess('')
  }

  // Función para verificar si todos los campos están completos
  const isFormComplete = () => {
    return formData.first_name.trim() !== '' &&
      formData.last_name.trim() !== '' &&
      formData.celphone.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.password1.trim() !== '' &&
      formData.password2.trim() !== '' &&
      formData.privacyPolicy &&
      formData.marketingConsent
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.first_name || !formData.last_name || !formData.celphone || !formData.email || !formData.password1 || !formData.password2) {
      setError('Por favor complete todos los campos obligatorios')
      return
    }

    if (!formData.privacyPolicy) {
      setError('Debes aceptar la política de privacidad para continuar')
      return
    }

    if (!formData.marketingConsent) {
      setError('Debes autorizar el envío de novedades para continuar')
      return
    }

    if (formData.password1 !== formData.password2) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (formData.password1.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      return
    }

    try {
      // Register user with the API
      const registerResult = await registerMutation.mutateAsync({
        first_name: formData.first_name,
        last_name: formData.last_name,
        celphone: formData.celphone,
        email: formData.email,
        password1: formData.password1,
        password2: formData.password2
      })

      // If registration returns tokens (auto-login), use them
      if (registerResult.access && registerResult.refresh && registerResult.user) {
        setSuccess('Registro exitoso. Iniciando sesión...')

        // Process the authentication response through context
        const loginResult = await login(registerResult)

        if (loginResult.success) {
          setTimeout(() => {
            navigate('/dashboard')
          }, 1500)
        } else {
          setError('Registro exitoso pero error al iniciar sesión automáticamente. Por favor inicie sesión manualmente.')
          setTimeout(() => {
            navigate('/login')
          }, 2000)
        }
      } else {
        // If registration doesn't return tokens, redirect to login
        setSuccess('Registro exitoso. Redirigiendo al login...')
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      }
    } catch (err) {
      setError(err.message || 'Error al registrar usuario')
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F9DCB8 0%, #8783CA 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 2
      }}
    >
      <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 3 } }}>
        <Card
          elevation={24}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            backdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)'
          }}
        >
          <CardContent sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 'bold',
                  color: '#333',
                  mb: 0.5
                }}
              >
                LOMI
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: '0.95rem' }}
              >
                Crea tu cuenta para comenzar
              </Typography>
            </Box>

            {/* Formulario */}
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {error && (
                  <Alert severity="error" sx={{ borderRadius: 2 }}>
                    {error}
                  </Alert>
                )}

                {success && (
                  <Alert severity="success" sx={{ borderRadius: 2 }}>
                    {success}
                  </Alert>
                )}

                {/* Información Personal */}
                <Typography variant="h6" sx={{ color: '#333', fontWeight: 600, fontSize: '1.1rem', mb: -1 }}>
                  Información Personal
                </Typography>

                {/* Nombre y Apellido en la misma fila */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    name="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    variant="outlined"
                    disabled={registerMutation.isPending}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Apellido"
                    name="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    variant="outlined"
                    disabled={registerMutation.isPending}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                </Box>

                {/* Contacto */}
                <Typography variant="h6" sx={{ color: '#333', fontWeight: 600, fontSize: '1.1rem', mb: -1, mt: 1 }}>
                  Información de Contacto
                </Typography>

                <TextField
                  fullWidth
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  disabled={registerMutation.isPending}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />

                <TextField
                  fullWidth
                  label="Número de celular"
                  name="celphone"
                  type="tel"
                  placeholder="Ej: +57 300 123 4567"
                  value={formData.celphone}
                  onChange={handleInputChange}
                  variant="outlined"
                  disabled={registerMutation.isPending}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />

                {/* Seguridad */}
                <Typography variant="h6" sx={{ color: '#333', fontWeight: 600, fontSize: '1.1rem', mb: -1, mt: 1 }}>
                  Seguridad
                </Typography>

                {/* Contraseñas en la misma fila */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Contraseña"
                    name="password1"
                    type="password"
                    value={formData.password1}
                    onChange={handleInputChange}
                    variant="outlined"
                    disabled={registerMutation.isPending}
                    helperText="Mínimo 8 caracteres"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Confirmar contraseña"
                    name="password2"
                    type="password"
                    value={formData.password2}
                    onChange={handleInputChange}
                    variant="outlined"
                    disabled={registerMutation.isPending}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                </Box>

                {/* Términos y Condiciones */}
                <Typography variant="h6" sx={{ color: '#333', fontWeight: 600, fontSize: '1.1rem', mb: -0.5, mt: 1 }}>
                  Términos y Condiciones
                </Typography>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    backgroundColor: 'rgba(135, 131, 202, 0.05)',
                    borderRadius: 2,
                    border: '1px solid rgba(135, 131, 202, 0.2)'
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="privacyPolicy"
                          checked={formData.privacyPolicy}
                          onChange={handleInputChange}
                          disabled={registerMutation.isPending}
                          size="small"
                          sx={{
                            color: '#8783CA',
                            '&.Mui-checked': {
                              color: '#8783CA',
                            },
                            '&:hover': {
                              backgroundColor: 'rgba(135, 131, 202, 0.1)',
                            }
                          }}
                        />
                      }
                      label={
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: '0.875rem',
                            lineHeight: 1.4,
                            color: '#555',
                            fontWeight: 400
                          }}
                        >
                          Acepto el tratamiento de mis datos personales según la política de privacidad.
                        </Typography>
                      }
                      sx={{
                        alignItems: 'flex-start',
                        margin: 0,
                        '& .MuiFormControlLabel-label': {
                          paddingLeft: 0.5
                        }
                      }}
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          name="marketingConsent"
                          checked={formData.marketingConsent}
                          onChange={handleInputChange}
                          disabled={registerMutation.isPending}
                          size="small"
                          sx={{
                            color: '#8783CA',
                            '&.Mui-checked': {
                              color: '#8783CA',
                            },
                            '&:hover': {
                              backgroundColor: 'rgba(135, 131, 202, 0.1)',
                            }
                          }}
                        />
                      }
                      label={
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: '0.875rem',
                            lineHeight: 1.4,
                            color: '#555',
                            fontWeight: 400
                          }}
                        >
                          Autorizo el envío de novedades y actualizaciones sobre el producto.
                        </Typography>
                      }
                      sx={{
                        alignItems: 'flex-start',
                        margin: 0,
                        '& .MuiFormControlLabel-label': {
                          paddingLeft: 0.5
                        }
                      }}
                    />
                  </Box>
                </Paper>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={registerMutation.isPending || !isFormComplete()}
                  startIcon={registerMutation.isPending ? <CircularProgress size={20} /> : <RegisterIcon />}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    background: 'linear-gradient(45deg, #F9DCB8, #8783CA 100%)',
                    '&:hover': {
                      background: 'linear-gradient(15deg, #5a6fd8 0%, #6a4190 100%)'
                    },
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 'medium'
                  }}
                >
                  {registerMutation.isPending ? 'Registrando...' : 'Crear cuenta'}
                </Button>

                {/* Enlace a políticas - más compacto */}
                <Box sx={{ textAlign: 'center', mt: 0.5, mb: 0.5 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem', lineHeight: 1.3 }}>
                    Consulta nuestra{' '}
                    <Link
                      component="a"
                      href="/docs/Politicas_Lomi.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: '#8783CA',
                        textDecoration: 'underline',
                        fontSize: '0.8rem',
                        '&:hover': {
                          textDecoration: 'none',
                          color: '#6a4190'
                        }
                      }}
                    >
                      Política de Privacidad
                    </Link>
                    {' y '}
                    <Link
                      component="a"
                      href="/docs/Politicas_Lomi.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: '#8783CA',
                        textDecoration: 'underline',
                        fontSize: '0.8rem',
                        '&:hover': {
                          textDecoration: 'none',
                          color: '#6a4190'
                        }
                      }}
                    >
                      Términos y Condiciones
                    </Link>
                  </Typography>
                </Box>

                {/* Link to Login */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 1.5,
                    backgroundColor: 'rgba(249, 220, 184, 0.1)',
                    borderRadius: 2,
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    ¿Ya tienes cuenta?{' '}
                    <RouterLink
                      to="/login"
                      style={{
                        color: '#8783CA',
                        textDecoration: 'none',
                        fontWeight: 'medium'
                      }}
                    >
                      Inicia sesión aquí
                    </RouterLink>
                  </Typography>
                </Paper>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default Register