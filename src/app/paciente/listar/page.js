'use client'

import { useState, useEffect } from "react"
import styles from './page.module.css'

export default function Pacientes() {
    const [pacientes, setPacientes] = useState([])
    const [loading, setLoading] = useState(true)

    const listaPacientes = async () => {
        try {
            const response = await fetch('https://api-clinica-2a.onrender.com/pacientes');
            const dados = await response.json();
            setPacientes(dados)
        } catch {
            console.error("Nenhum paciente encontrado", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        listaPacientes()
    }, [])

    if (loading) {
        console.log("Carregando lista de pacientes...")
    }

    return (
        <div>
            <h1 className={styles.h1}>Lista de pacientes</h1>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tr}>
                        <th className={styles.th}>ID</th>
                        <th className={styles.th}>Nome</th>
                        <th className={styles.th}>Telefone</th>
                        <th className={styles.th}>Email</th>
                        <th className={styles.th}>CPF</th>
                    </tr>
                </thead>
                <tbody>
                    {pacientes.map((paciente) => (
                        <tr key={paciente.id}>
                            <td className={styles.td}>{paciente.id}</td>
                            <td className={styles.td}>{paciente.nome}</td>
                            <td className={styles.td}>{paciente.telefone}</td>
                            <td className={styles.td}>{paciente.email}</td>
                            <td className={styles.td}>{paciente.cpf}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}