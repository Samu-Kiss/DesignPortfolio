// src/components/Projects.jsx
import React from 'react';
import { Link } from 'react-router-dom';


const Projects = () => {
    return (
        <section className="projects" id="proyectos">
            <h2 className="projects-title">
                <span className="luxurious">P</span>
                <span className="lexend">RO</span>
                <span className="luxurious">Y</span>
                <span className="lexend">ECT</span>
                <span className="luxurious">O</span>
                <span className="lexend">S</span>
            </h2>
            <div className="projects-list">
                <Link to="/redes" className="project-item redes">
                    <h4>Creación de contenido para </h4>
                    <h3 className="type-title">
                        <span className="luxurious">R</span>
                        <span className="lexend">ED</span>
                        <span className="luxurious">E</span>
                        <span className="lexend">S </span>
                        <span className="luxurious">S </span>
                        <span className="lexend">OCI</span>
                        <span className="luxurious">A</span>
                        <span className="lexend">LES</span>
                    </h3>
                </Link>
                <Link to="/diseno" className="project-item diseno">
                    <h3 className="type-title">
                        <span className="luxurious">D</span>
                        <span className="lexend">ISE</span>
                        <span className="luxurious">Ñ</span>
                        <span className="lexend">O</span>
                    </h3>
                </Link>
                <Link to="/video" className="project-item video">
                    <h4>Producción y edición de</h4>
                    <h3 className="type-title">
                        <span className="luxurious">V</span>
                        <span className="lexend">IDE</span>
                        <span className="luxurious">O</span>
                    </h3>
                </Link>
                <Link to="/foto" className="project-item foto">
                    <h3 className="type-title">
                        <span className="luxurious">F </span>
                        <span className="lexend">OTO</span>
                        <span className="luxurious">G</span>
                        <span className="lexend">RA</span>
                        <span className="luxurious">F</span>
                        <span className="lexend">ÍA</span>
                    </h3>
                </Link>
            </div>
        </section>
    );
};

export default Projects;