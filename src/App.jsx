// src/App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Redes from './pages/Redes';
import Diseno from './pages/Diseno';
import Video from './pages/Video';
import Foto from './pages/Foto';

const App = () => {
    return (
        <Router>
            <Routes>
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
                <Route path="/diseño" element={<Diseno />} />
                <Route path="/video" element={<Video />} />
                <Route path="/foto" element={<Foto />} />
            </Routes>
        </Router>
    );
};

export default App;