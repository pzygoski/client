"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);

    const alternarMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.header}>
            <Image className={styles.logo} src='/Image/logo.png' alt="Logo" width={100} height={90} />

            <button 
                onClick={alternarMenu} 
                className={`${styles.menuButton} ${isMenuOpen ? styles.open : ''}`}
            >
                ☰
            </button>

            <nav className={`${styles.navMenu} ${isMenuOpen ? styles.showMenu : ''}`}>
                <ul className={styles.lista}>
                    <li className={styles.li}><Link href="/">Home</Link></li>
                    <li 
                        className={styles.li} 
                        onMouseEnter={() => setHoveredItem("Medico")}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <Link href="/medico">Medico</Link>
                        {hoveredItem === "Medico" && (
                            <ul className={styles.submenu}>
                                <li><Link href="./medico">Listar</Link></li>
                                <li><Link href="/medico/adicionar">Adicionar</Link></li>
                                <li><Link href="/medico/editar">Editar</Link></li>
                                <li><Link href="/medico/excluir">Excluir</Link></li>
                            </ul>
                        )}
                    </li>
                    <li 
                        className={styles.li} 
                        onMouseEnter={() => setHoveredItem("Paciente")}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <Link href="/paciente">Paciente</Link>
                        {hoveredItem === "Paciente" && (
                            <ul className={styles.submenu}>
                                <li><Link href="./paciente">Listar</Link></li>
                                <li><Link href="/paciente/adicionar">Adicionar</Link></li>
                                <li><Link href="/paciente/editar">Editar</Link></li>
                                <li><Link href="/paciente/excluir">Excluir</Link></li>
                            </ul>
                        )}
                    </li>
                    <li 
                        className={styles.li} 
                        onMouseEnter={() => setHoveredItem("Consulta")}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <Link href="/consulta">Consulta</Link>
                        {hoveredItem === "Consulta" && (
                            <ul className={styles.submenu}>
                                <li><Link href="/consulta">Listar</Link></li>
                                <li><Link href="/consulta/adicionar">Adicionar</Link></li>
                                <li><Link href="/consulta/editar">Editar</Link></li>
                                <li><Link href="/consulta/excluir">Excluir</Link></li>
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
}