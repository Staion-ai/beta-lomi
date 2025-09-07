import React from 'react'
import { useNavigate } from 'react-router-dom'
import { 
    Container, 
    Typography, 
    Button, 
    Box, 
    Paper, 
    Grid,
    Card,
    CardContent,
    CardActions
} from '@mui/material'
import { Add, Assignment, Visibility } from '@mui/icons-material'
import AuthHeader from '../components/auth/AuthHeader'

function Dashboard() {
    const navigate = useNavigate()

    const handleCreateProject = () => {
        navigate('/form')
    }

    return (
        <>
            <AuthHeader title="Dashboard - Gestión de Proyectos" />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Header Section */}
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography 
                        variant="h3" 
                        component="h1" 
                        gutterBottom
                        sx={{ 
                            fontWeight: 'bold',
                            color: '#333',
                            mb: 2
                        }}
                    >
                        Bienvenido a LOMI
                    </Typography>
                    <Typography 
                        variant="h6" 
                        color="text.secondary"
                        sx={{ mb: 4 }}
                    >
                        Gestiona tus proyectos y crea contenido increíble
                    </Typography>
                </Box>

                {/* Action Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={4}>
                        <Card 
                            sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 3,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
                                }
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                                <Box
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: '50%',
                                        backgroundColor: '#F9DCB8',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mx: 'auto',
                                        mb: 2
                                    }}
                                >
                                    <Add sx={{ fontSize: 40, color: '#8783CA' }} />
                                </Box>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Crear Proyecto
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Inicia un nuevo proyecto completando el formulario con la información de tu empresa
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ p: 3, pt: 0 }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleCreateProject}
                                    sx={{
                                        backgroundColor: '#8783CA',
                                        color: 'white',
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        '&:hover': {
                                            backgroundColor: '#6f6ba3'
                                        }
                                    }}
                                >
                                    Crear Nuevo Proyecto
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card 
                            sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 3,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                opacity: 0.6
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                                <Box
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: '50%',
                                        backgroundColor: '#F9DCB8',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mx: 'auto',
                                        mb: 2
                                    }}
                                >
                                    <Assignment sx={{ fontSize: 40, color: '#8783CA' }} />
                                </Box>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Mis Proyectos
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Ver y gestionar todos tus proyectos existentes
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ p: 3, pt: 0 }}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    disabled
                                    sx={{
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontWeight: 600
                                    }}
                                >
                                    Próximamente
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card 
                            sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 3,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                opacity: 0.6
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                                <Box
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: '50%',
                                        backgroundColor: '#F9DCB8',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mx: 'auto',
                                        mb: 2
                                    }}
                                >
                                    <Visibility sx={{ fontSize: 40, color: '#8783CA' }} />
                                </Box>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Vista Previa
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Visualiza cómo se verán tus plantillas generadas
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ p: 3, pt: 0 }}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    disabled
                                    sx={{
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontWeight: 600
                                    }}
                                >
                                    Próximamente
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>

                {/* Instructions Section */}
                <Paper 
                    elevation={1} 
                    sx={{ 
                        p: 4, 
                        borderRadius: 3,
                        backgroundColor: '#F9DCB8',
                        border: '1px solid #e0e0e0'
                    }}
                >
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#333' }}>
                        ¿Cómo funciona?
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                    <Box
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: '50%',
                                            backgroundColor: '#8783CA',
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            fontSize: '1.1rem',
                                            flexShrink: 0
                                        }}
                                    >
                                        1
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" gutterBottom>
                                            Crear Proyecto
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Haz clic en "Crear Nuevo Proyecto" y completa el formulario con la información de tu empresa
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                    <Box
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: '50%',
                                            backgroundColor: '#8783CA',
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            fontSize: '1.1rem',
                                            flexShrink: 0
                                        }}
                                    >
                                        2
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" gutterBottom>
                                            Completar Formulario
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Proporciona información sobre tu empresa, productos y testimonios de clientes
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                    <Box
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: '50%',
                                            backgroundColor: '#8783CA',
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            fontSize: '1.1rem',
                                            flexShrink: 0
                                        }}
                                    >
                                        3
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" gutterBottom>
                                            Vista Previa
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Visualiza automáticamente cómo se ve tu contenido en diferentes plantillas
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </>
    )
}

export default Dashboard
