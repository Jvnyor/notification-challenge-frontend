import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
);
