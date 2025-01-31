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
            <Image className={styles.logo} src='/images/logo.png' alt="Logo" width={190} height={60}/>
            
            <button onClick={alternarMenu} className={`${styles.menuButton} ${isMenuOpen ? styles.open : ''}`}>

            </button>

            <nav className={`${styles.navMenu} ${isMenuOpen ? styles.showMenu : ''}`}>
                <ul className={styles.lista}>
                    <li>
                        <Link href="/">Médico</Link>
                    </li>
                    <li>
                        <Link href="/">Pasciente</Link>
                    </li>
                    <li>
                        <Link href="/">Consulta</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}