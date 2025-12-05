// src/components/SettingsToggle.jsx
import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import './SettingsToggle/SettingsToggle.css';

const SettingsToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className="settings-toggle">
            {/* Theme Toggle */}
            <motion.button
                className="toggle-btn theme-toggle"
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                title={isDark ? 'Modo claro' : 'Modo oscuro'}
            >
                <motion.div
                    initial={false}
                    animate={{ rotate: isDark ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {isDark ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="5"/>
                            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                        </svg>
                    )}
                </motion.div>
            </motion.button>
        </div>
    );
};

export default SettingsToggle;
