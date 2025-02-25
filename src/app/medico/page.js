"use client";

import styles from './page.module.css'
import { useEffect, useState } from "react"

export default function Medicos() {
    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busca, setBusca] = useState("");
    const [mostrarDiv, setMostrarDiv] = useState(false);

    const listaMedicos = async () => {
        try {
            const response = await fetch('https://api-clinica-2a.onrender.com/medicos');
            const dados = await response.json();
            setMedicos(dados);
        } catch (error) {
            console.error('Nenhum médico encontrado:', error);
        } finally {
            setLoading(false);
        }
    };

    const valorInput = (e) => {
        setBusca(e.target.value);
    };

    useEffect(() => {
        listaMedicos();
    }, []);

    if (loading) {
        return <p>Carregando lista de médicos...</p>;
    }

    const medicosFiltrados = medicos.filter((medico) =>
        medico.nome.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div>
            <h1 className={styles.h1}>Lista de médicos</h1>
            
            <div className={styles.divBuscar}>
                    <input
                        className={styles.input}
                        type="text"
                        value={busca}
                        onChange={valorInput}
                        placeholder="Digite o nome do médico"
                    />
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.tr}>
                            <th className={styles.th}>ID</th>
                            <th className={styles.th}>Nome</th>
                            <th className={styles.th}>Telefone</th>
                            <th className={styles.th}>Email</th>
                            <th className={styles.th}>Especialidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicosFiltrados.length > 0 ? (
                            medicosFiltrados.map((medico) => (
                                <tr key={medico.id}>
                                    <td className={styles.td}>{medico.id}</td>
                                    <td className={styles.td}>{medico.nome}</td>
                                    <td className={styles.td}>{medico.telefone}</td>
                                    <td className={styles.td}>{medico.email}</td>
                                    <td className={styles.td}>{medico.especialidade}</td>
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
        </div>
    );
}
