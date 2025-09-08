import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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
  CardContent
} from '@mui/material'
import { PersonAdd as RegisterIcon } from '@mui/icons-material'
import { useRegisterUser } from '../hooks/useRegisterUser'

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    password2: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const registerMutation = useRegisterUser()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpiar mensajes al escribir
    if (error) setError('')
    if (success) setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.email || !formData.password1 || !formData.password2) {
      setError('Por favor complete todos los campos')
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
      await registerMutation.mutateAsync({
        email: formData.email,
        password1: formData.password1,
        password2: formData.password2
      })
      
      setSuccess('Registro exitoso. Redirigiendo al login...')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
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
        py: 3
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={24}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            backdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)'
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 'bold',
                  color: '#333',
                  mb: 1
                }}
              >
                LOMI
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
              >
                Crea tu cuenta para comenzar
              </Typography>
            </Box>

            {/* Formulario */}
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
                  label="Contraseña"
                  name="password1"
                  type="password"
                  value={formData.password1}
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

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={registerMutation.isPending}
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

                {/* Link to Login */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    backgroundColor: 'rgba(249, 220, 184, 0.1)',
                    borderRadius: 2,
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    ¿Ya tienes cuenta?{' '}
                    <Link
                      to="/login"
                      style={{
                        color: '#8783CA',
                        textDecoration: 'none',
                        fontWeight: 'medium'
                      }}
                    >
                      Inicia sesión aquí
                    </Link>
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