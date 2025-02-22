'use client'

import styles from './page.module.css'
import { useState, useEffect } from 'react';

export default function listaConsulta() {
    const [consulta, setConsulta] = useState([])
    const [loading, setLoading] = useState(true)

    const listaConsulta = async () => {
        try {
            const response = await fetch('https://api-clinica-2a.onrender.com/consultas');
            const dados = await response.json();
            setConsulta(dados);
        } catch (error) {
            console.error("Consulta não encontrada", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        listaConsulta()
    }, [])

    if (loading) {
        console.log('Carregando listas de consultas...')
    }

    return (
        <div>
            <h1 className={styles.h1}>Lista de consultas</h1>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tr}>
                        <th className={styles.th}>ID</th>
                        <th className={styles.th}>Especialidade</th>
                        <th className={styles.th}>Médico</th>
                        <th className={styles.th}>Paciente</th>
                        <th className={styles.th}>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {consulta.map((consulta) => (
                        <tr key={consulta.id}>
                            <td className={styles.td}>{consulta.id}</td>
                            <td className={styles.td}>{consulta.especialidade}</td>
                            <td className={styles.td}>{consulta.medico}</td>
                            <td className={styles.td}>{consulta.paciente}</td>
                            <td className={styles.td}>{consulta.tipo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}