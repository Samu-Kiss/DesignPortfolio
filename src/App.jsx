// src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import LoadingScreen from './components/LoadingScreen';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Redes from './pages/Redes';
import Diseno from './pages/Diseno';
import Video from './pages/Video';
import Foto from './pages/Foto';

const AnimatedRoutes = () => {
    const location = useLocation();
    
    return (
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
            </Routes>
        </AnimatePresence>
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
        <Router>
            <AnimatePresence mode="wait">
                {isLoading && (
                    <LoadingScreen onLoadingComplete={handleLoadingComplete} />
                )}
            </AnimatePresence>
            <div className={`app-content ${showContent ? 'visible' : ''}`}>
                <AnimatedRoutes />
            </div>
        </Router>
    );
};

export default App;