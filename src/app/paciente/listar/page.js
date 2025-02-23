'use client'

import { useState, useEffect } from "react"
import styles from './page.module.css'

export default function Pacientes() {
    const [pacientes, setPacientes] = useState([])
    const [loading, setLoading] = useState(true)
    const [busca, setBusca] = useState("")
    const [mostrarDiv, setMostrarDiv] = useState(false)

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

    const mostrar = () => {
        setMostrarDiv(!mostrarDiv);
    };

    const valorInput = (e) => {
        setBusca(e.target.value);
    };

    useEffect(() => {
        listaPacientes()
    }, [])

    if (loading) {
        console.log("Carregando lista de pacientes...")
    }

    const pacientesFiltrados = pacientes.filter((paciente) =>
        paciente.nome.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div>
            <h1 className={styles.h1}>Lista de pacientes</h1>

            <button className={styles.button} onClick={mostrar}>
                Buscar Paciente
            </button>

            {mostrarDiv && (
                <div className={styles.divBuscar}>
                    <input
                        className={styles.input}
                        type="text"
                        value={busca}
                        onChange={valorInput}
                        placeholder="Digite o nome do paciente"
                    />
                </div>
            )}

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
                {pacientesFiltrados.length > 0 ? (
                        pacientesFiltrados.map((paciente) => (
                            <tr key={paciente.id}>
                                <td className={styles.td}>{paciente.id}</td>
                                <td className={styles.td}>{paciente.nome}</td>
                                <td className={styles.td}>{paciente.telefone}</td>
                                <td className={styles.td}>{paciente.email}</td>
                                <td className={styles.td}>{paciente.cpf}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className={styles.td}>
                                Nenhum médico encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}