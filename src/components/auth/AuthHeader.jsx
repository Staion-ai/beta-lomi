import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  CircularProgress,
  IconButton
} from '@mui/material'
import {
  Logout as LogoutIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/useAuth'
import { useLogout } from '../../hooks'

const AuthHeader = ({ title = 'LOMI Dashboard', showBackButton = false }) => {
  const { user } = useAuth()
  const { logout, isLoading: logoutLoading } = useLogout()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout('/login')
  }

  const handleBackToDashboard = () => {
    navigate('/dashboard')
  }

  const getUserDisplayName = () => {
    if (!user) return 'Usuario'

    const firstName = user.first_name || ''
    const lastName = user.last_name || ''
    const fullName = `${firstName} ${lastName}`.trim()

    if (fullName) return fullName
    if (user.username && user.username !== user.email) return user.username
    if (user.email) return user.email.split('@')[0]

    return 'Usuario'
  }

  const getUserInitial = () => {
    const displayName = getUserDisplayName()
    return displayName.charAt(0).toUpperCase()
  }

  return (
    <AppBar
      position="static"
      sx={{
        background: '#8783CA ',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          {showBackButton && (
            <IconButton
              color="inherit"
              onClick={handleBackToDashboard}
              sx={{
                mr: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Avatar
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              mr: 2,
              width: 40,
              height: 40
            }}
          >
            {getUserInitial()}
          </Avatar>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user && (
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Hola, {getUserDisplayName()}
            </Typography>
          )}
          <Button
            color="inherit"
            onClick={handleLogout}
            disabled={logoutLoading}
            startIcon={logoutLoading ? <CircularProgress size={16} color="inherit" /> : <LogoutIcon />}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              },
              '&:disabled': {
                color: 'rgba(255,255,255,0.5)'
              }
            }}
          >
            {logoutLoading ? 'Cerrando...' : 'Cerrar Sesión'}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default AuthHeader