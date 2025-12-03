// src/App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
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
    return (
        <Router>
            <AnimatedRoutes />
        </Router>
    );
};

export default App;