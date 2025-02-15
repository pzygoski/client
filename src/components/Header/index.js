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

            <button onClick={alternarMenu} className={`${styles.menuButton} ${isMenuOpen ? styles.open : ''}`}>
                ☰
            </button>

            <nav className={`${styles.navMenu} ${isMenuOpen ? styles.showMenu : ''}`}>
                <ul className={styles.lista}>
                    {["Home", "Medico", "Paciente", "Consulta"].map((item) => {
                        const path = item.toLowerCase();
                        const isHome = item === "Home"; // Verifica se é "Home"

                        return (
                            <li
                                key={item}
                                className={styles.li}
                                onMouseEnter={() => !isHome && setHoveredItem(item)} // Impede submenu no "Home"
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <Link href={isHome ? "/" : `/${path}`}>{item}</Link>

                                {!isHome && hoveredItem === item && (
                                    <ul className={styles.submenu}>
                                        <li><Link href={`/${path}/listar`}>Listar</Link></li>
                                        <li><Link href={`/${path}/adicionar`}>Adicionar</Link></li>
                                        <li><Link href={`/${path}/editar`}>Editar</Link></li>
                                        <li><Link href={`/${path}/excluir`}>Excluir</Link></li>
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
}
