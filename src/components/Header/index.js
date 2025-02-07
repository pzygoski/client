'use client'

import Link from "next/link";
import styles from './Header.module.css';
import { useState } from "react";
import Image from "next/image";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const alternarMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.header}>
            <Image className={styles.logo} src='/Image/logo.png' alt="Logo" width={120} height={90}/>
            
            <button onClick={alternarMenu} className={`${styles.menuButton} ${isMenuOpen ? styles.open : ''}`}>

            </button>

            <nav className={`${styles.navMenu} ${isMenuOpen ? styles.showMenu : ''}`}>
                <ul className={styles.lista}>
                    <li className={styles.li}>
                        <Link href="/">Médico</Link>
                    </li>
                    <li className={styles.li}>
                        <Link href="/">Paciente</Link>
                    </li>
                    <li className={styles.li}>
                        <Link href="/">Consulta</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}