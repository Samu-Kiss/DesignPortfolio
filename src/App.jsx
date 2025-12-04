// src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import SettingsToggle from './components/SettingsToggle';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Redes from './pages/Redes';
import Diseno from './pages/Diseno';
import Video from './pages/Video';
import Foto from './pages/Foto';
import Proyecto from './pages/Proyecto';
import NotFound from './pages/NotFound';

// Componente para scroll to top en cambio de ruta
const ScrollToTop = () => {
    const { pathname } = useLocation();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return null;
};

const AnimatedRoutes = () => {
    const location = useLocation();
    
    return (
        <>
            <ScrollToTop />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                    <div>
                        <Navbar />
                        <Hero />
                        <About />
                        <Projects />
                        <Contact />
                    </div>
                } />
                <Route path="/redes" element={<Redes />} />
                <Route path="/diseno" element={<Diseno />} />
                <Route path="/video" element={<Video />} />
                <Route path="/foto" element={<Foto />} />
                <Route path="/proyecto/:section/:projectId" element={<Proyecto />} />
                <Route path="*" element={<NotFound />} />
                </Routes>
            </AnimatePresence>
        </>
    );
};

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);

    const handleLoadingComplete = () => {
        setIsLoading(false);
        // Pequeño delay para la animación de entrada del contenido
        setTimeout(() => setShowContent(true), 100);
    };

    return (
        <ThemeProvider>
            <LanguageProvider>
                <Router>
                    <CustomCursor />
                    <SettingsToggle />
                    <AnimatePresence mode="wait">
                        {isLoading && (
                            <LoadingScreen onLoadingComplete={handleLoadingComplete} />
                        )}
                    </AnimatePresence>
                    <div className={`app-content ${showContent ? 'visible' : ''}`}>
                        <AnimatedRoutes />
                    </div>
                </Router>
            </LanguageProvider>
        </ThemeProvider>
    );
};

export default App;