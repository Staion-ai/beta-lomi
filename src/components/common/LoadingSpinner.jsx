import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
    Box,
    CircularProgress,
    LinearProgress,
    Skeleton,
    Typography,
    Fade,
    styled,
    keyframes
} from '@mui/material';

// Animación personalizada para el pulso
const pulse = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(25, 118, 210, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0);
  }
`;

// Spinner personalizado con efecto de pulso
const PulsingSpinner = styled(Box)(({ theme, color }) => ({
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: theme.palette[color]?.main || theme.palette.primary.main,
    animation: `${pulse} 2s infinite`,
}));

// Contenedor principal con overlay
const LoadingOverlay = styled(Box)(({ theme, overlay }) => ({
    position: overlay ? 'fixed' : 'relative',
    top: overlay ? 0 : 'auto',
    left: overlay ? 0 : 'auto',
    right: overlay ? 0 : 'auto',
    bottom: overlay ? 0 : 'auto',
    backgroundColor: overlay ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
    backdropFilter: overlay ? 'blur(2px)' : 'none',
    zIndex: overlay ? 9999 : 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 2,
    padding: 3,
}));

// Animación para los dots
const dotAnimation = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

// Dots animados
const DotsContainer = styled(Box)({
    display: 'flex',
    gap: '4px',
});

const Dot = styled(Box)(({ theme, delay, color }) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette[color]?.main || theme.palette.primary.main,
    animation: `${dotAnimation} 1.4s infinite ease-in-out both`,
    animationDelay: `${delay}s`,
}));

const LoadingSpinner = ({
    variant = 'circular',
    size = 'medium',
    color = 'primary',
    message = '',
    overlay = false,
    fullScreen = false,
    progress = null,
    timeout = null,
    onTimeout = () => { },
    children = null,
    customStyles = {},
    ...props
}) => {
    const [showTimeout, setShowTimeout] = React.useState(false);

    // Configuración de tamaños
    const sizes = {
        small: { width: 20, height: 20, fontSize: '0.875rem' },
        medium: { width: 40, height: 40, fontSize: '1rem' },
        large: { width: 60, height: 60, fontSize: '1.25rem' },
    };

    const currentSize = sizes[size] || sizes.medium;

    // Manejar timeout
    React.useEffect(() => {
        if (timeout) {
            const timer = setTimeout(() => {
                setShowTimeout(true);
                onTimeout();
            }, timeout);

            return () => clearTimeout(timer);
        }
    }, [timeout, onTimeout]);

    // Función para renderizar diferentes variantes
    const renderSpinner = () => {
        switch (variant) {
            case 'linear':
                return (
                    <Box sx={{ width: '100%', maxWidth: 300 }}>
                        <LinearProgress
                            color={color}
                            variant={progress !== null ? 'determinate' : 'indeterminate'}
                            value={progress}
                            sx={{ height: 6, borderRadius: 3 }}
                        />
                        {progress !== null && (
                            <Typography variant="body2" sx={{ textAlign: 'center', mt: 1 }}>
                                {Math.round(progress)}%
                            </Typography>
                        )}
                    </Box>
                );

            case 'dots':
                return (
                    <DotsContainer>
                        {[0, 1, 2].map((index) => (
                            <Dot
                                key={index}
                                delay={index * 0.16}
                                color={color}
                            />
                        ))}
                    </DotsContainer>
                );

            case 'pulse':
                return <PulsingSpinner color={color} />;

            case 'skeleton':
                return (
                    <Box sx={{ width: '100%', maxWidth: 300 }}>
                        <Skeleton variant="text" width="100%" height={40} />
                        <Skeleton variant="text" width="80%" height={30} />
                        <Skeleton variant="text" width="60%" height={30} />
                    </Box>
                );

            case 'custom':
                return children;

            default: // circular
                return (
                    <CircularProgress
                        color={color}
                        size={currentSize.width}
                        thickness={4}
                        variant={progress !== null ? 'determinate' : 'indeterminate'}
                        value={progress}
                        {...props}
                    />
                );
        }
    };

    const content = (
        <Fade in timeout={300}>
            <LoadingOverlay
                overlay={overlay || fullScreen}
                sx={{
                    minHeight: fullScreen ? '100vh' : 'auto',
                    ...customStyles
                }}
            >
                {renderSpinner()}

                {message && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            fontSize: currentSize.fontSize,
                            textAlign: 'center',
                            maxWidth: 300,
                            mt: variant === 'skeleton' ? 0 : 1
                        }}
                    >
                        {message}
                    </Typography>
                )}

                {progress !== null && variant === 'circular' && (
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                    >
                        {Math.round(progress)}%
                    </Typography>
                )}

                {showTimeout && (
                    <Typography
                        variant="body2"
                        color="warning.main"
                        sx={{ mt: 2, textAlign: 'center' }}
                    >
                        La carga está tomando más tiempo del esperado...
                    </Typography>
                )}
            </LoadingOverlay>
        </Fade>
    );

    // Si es fullScreen, renderizar en un portal
    if (fullScreen && typeof document !== 'undefined') {
        return ReactDOM.createPortal(
            content,
            document.body
        );
    }

    return content;
};

// Componente de Loading con contexto para manejar múltiples estados
export const LoadingProvider = ({ children }) => {
    const [loadingStates, setLoadingStates] = React.useState({});

    const setLoading = React.useCallback((key, isLoading, options = {}) => {
        setLoadingStates(prev => ({
            ...prev,
            [key]: isLoading ? { loading: true, ...options } : undefined
        }));
    }, []);

    const contextValue = React.useMemo(() => ({
        loadingStates,
        setLoading,
        isLoading: (key) => !!loadingStates[key]?.loading,
        getLoadingOptions: (key) => loadingStates[key] || {}
    }), [loadingStates, setLoading]);

    return (
        <LoadingContext.Provider value={contextValue}>
            {children}
            {Object.entries(loadingStates).map(([key, state]) => (
                state?.loading && (
                    <LoadingSpinner
                        key={key}
                        overlay
                        message={state.message}
                        variant={state.variant}
                        color={state.color}
                        size={state.size}
                    />
                )
            ))}
        </LoadingContext.Provider>
    );
};

// Context para el loading
const LoadingContext = React.createContext();

// Hook para usar el loading context
export const useLoading = () => {
    const context = React.useContext(LoadingContext);

    if (!context) {
        // Si no hay contexto, devolver funciones básicas
        return {
            setLoading: () => { },
            isLoading: () => false,
            getLoadingOptions: () => ({})
        };
    }

    return context;
};

// Hook para loading con cleanup automático
export const useAsyncLoading = (key = 'default') => {
    const { setLoading } = useLoading();

    const executeWithLoading = React.useCallback(async (
        asyncFunction,
        options = {}
    ) => {
        try {
            setLoading(key, true, options);
            const result = await asyncFunction();
            return result;
        } catch (error) {
            console.error('Error during async operation:', error);
            throw error;
        } finally {
            setLoading(key, false);
        }
    }, [key, setLoading]);

    return { executeWithLoading };
};

// PropTypes
LoadingSpinner.propTypes = {
    variant: PropTypes.oneOf(['circular', 'linear', 'dots', 'pulse', 'skeleton', 'custom']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    color: PropTypes.oneOf(['primary', 'secondary', 'error', 'warning', 'info', 'success']),
    message: PropTypes.string,
    overlay: PropTypes.bool,
    fullScreen: PropTypes.bool,
    progress: PropTypes.number,
    timeout: PropTypes.number,
    onTimeout: PropTypes.func,
    children: PropTypes.node,
    customStyles: PropTypes.object,
};

LoadingProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LoadingSpinner;
