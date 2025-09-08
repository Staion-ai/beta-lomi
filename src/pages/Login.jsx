import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
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
import { Login as LoginIcon } from '@mui/icons-material'
import { useAuth } from '../contexts/useAuth'
import { useLoginUser } from '../hooks/useLoginUser'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const { login, loading } = useAuth()
  const loginMutation = useLoginUser()

  const from = '/form'
  const isLoading = loading || loginMutation.isPending

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpiar error al escribir
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError('Por favor complete todos los campos')
      return
    }

    try {
      // Try to login with the real API first
      const apiResult = await loginMutation.mutateAsync({
        username: formData.email,
        password: formData.password
      })

      // If API login succeeds, navigate to the protected route
      navigate(from, { replace: true })
    } catch (apiError) {
      // If API fails, fall back to the existing mock system for demo purposes
      console.log('API login failed, trying demo credentials:', apiError.message)

      const result = await login(formData.email, formData.password)

      if (result.success) {
        navigate(from, { replace: true })
      } else {
        setError(`Error de conexión con el servidor. ${result.error}`)
      }
    }
  }

  const handleDemoCredentials = () => {
    setFormData({
      email: 'admin@lomi.com',
      password: 'admin123'
    })
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg,#F9DCB8, #8783CA 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 3
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={8}
          sx={{
            borderRadius: 3,
            overflow: 'hidden'
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Logo y titulo */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box sx={{ mb: 2 }}>
                <img
                  src="/favicon.ico"
                  alt="LOMI Logo"
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px'
                  }}
                />
              </Box>
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
                Ingresa a tu cuenta para continuar
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

                <TextField
                  fullWidth
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  disabled={isLoading}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />

                <TextField
                  fullWidth
                  label="Contraseña"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  variant="outlined"
                  disabled={isLoading}
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
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} /> : <LoginIcon />}
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
                  {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>

                {/* Credenciales de demo */}
                <Paper
                  sx={{
                    p: 2,
                    bgcolor: '#f8f9fa',
                    borderRadius: 2,
                    border: '1px dashed #dee2e6'
                  }}
                >
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Credenciales de demostración:</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Email: admin@lomi.com
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Contraseña: admin123
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={handleDemoCredentials}
                    disabled={isLoading}
                    sx={{
                      textTransform: 'none',
                      borderRadius: 1.5
                    }}
                  >
                    Usar credenciales de demo
                  </Button>
                </Paper>

                {/* Link to Register */}
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
                    ¿No tienes cuenta?{' '}
                    <Link
                      to="/register"
                      style={{
                        color: '#8783CA',
                        textDecoration: 'none',
                        fontWeight: 'medium'
                      }}
                    >
                      Regístrate aquí
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

export default Login