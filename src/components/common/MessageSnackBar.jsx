import React from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';

const SlideTransition = (props) => {
    return <Slide {...props} direction="up" />;
};

const MessageSnackbar = ({
    open,
    message,
    severity = 'info',
    onClose,
    autoHideDuration = 6000,
    position = { vertical: 'bottom', horizontal: 'center' }
}) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        onClose();
    };

    const getSeverityColors = (severity) => {
        const colors = {
            success: {
                backgroundColor: '#d4edda',
                color: '#155724',
                iconColor: '#28a745'
            },
            error: {
                backgroundColor: '#f8d7da',
                color: '#721c24',
                iconColor: '#dc3545'
            },
            warning: {
                backgroundColor: '#fff3cd',
                color: '#856404',
                iconColor: '#ffc107'
            },
            info: {
                backgroundColor: '#d1ecf1',
                color: '#0c5460',
                iconColor: '#17a2b8'
            }
        };
        return colors[severity] || colors.info;
    };

    const severityColors = getSeverityColors(severity);

    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            anchorOrigin={position}
            TransitionComponent={SlideTransition}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{
                    width: '100%',
                    minWidth: '300px',
                    borderRadius: 2,
                    fontSize: '14px',
                    fontWeight: '500',
                    backgroundColor: severityColors.backgroundColor,
                    color: severityColors.color,
                    '& .MuiAlert-icon': {
                        color: severityColors.iconColor
                    },
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    '& .MuiAlert-action': {
                        color: severityColors.iconColor
                    }
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default MessageSnackbar;