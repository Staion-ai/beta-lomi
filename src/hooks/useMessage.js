import { useState } from 'react';

export const useMessage = () => {
    const [message, setMessage] = useState({
        open: false,
        text: '',
        severity: 'info'
    });

    const showMessage = (text, severity = 'info') => {
        setMessage({
            open: true,
            text,
            severity
        });
    };

    const showSuccess = (text) => showMessage(text, 'success');
    const showError = (text) => showMessage(text, 'error');
    const showWarning = (text) => showMessage(text, 'warning');
    const showInfo = (text) => showMessage(text, 'info');

    const hideMessage = () => {
        setMessage(prev => ({ ...prev, open: false }));
    };

    return {
        message,
        showMessage,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        hideMessage
    };
};