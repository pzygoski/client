'use client'

import styles from './page.module.css'
import { useState, useEffect } from 'react';

export default function ListaConsulta() {
    const [consulta, setConsulta] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busca, setBusca] = useState("");
    const [filtro, setFiltro] = useState("medico"); // "medico" ou "paciente"
    const [mostrarInput, setMostrarInput] = useState(false);

    const listaConsulta = async () => {
        try {
            const response = await fetch('https://api-clinica-2a.onrender.com/consultas');
            const dados = await response.json();
            setConsulta(dados);
        } catch (error) {
            console.error("Consulta não encontrada", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        listaConsulta();
    }, []);

    if (loading) {
        return <p>Carregando listas de consultas...</p>;
    }

    const consultasFiltradas = consulta.filter((c) =>
        filtro === "medico" ? c.medico.toLowerCase().includes(busca.toLowerCase()) : c.paciente.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div>
            <h1 className={styles.h1}>Lista de consultas</h1>

            <div className={styles.buttons}>
                <button className={styles.button1} onClick={() => { setFiltro("medico"); setMostrarInput(!mostrarInput); }}>
                    Buscar por Médico
                </button>

                <button className={styles.button2} onClick={() => { setFiltro("paciente"); setMostrarInput(!mostrarInput); }}>
                    Buscar por Paciente
                </button>
            </div>

            {mostrarInput && (
                <div className={styles.divBuscar}> {/* Alterado de mostrarDiv para divBuscar */}
                    <input
                        className={styles.input}
                        type="text"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        placeholder={`Digite o nome do ${filtro}`}
                    />
                </div>
            )}

            <table className={styles.table}>
                <thead>
                    <tr className={styles.tr}>
                        <th className={styles.th}>ID</th>
                        <th className={styles.th}>Médico</th>
                        <th className={styles.th}>Especialidade</th>
                        <th className={styles.th}>Paciente</th>
                        <th className={styles.th}>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {consultasFiltradas.length > 0 ? (
                        consultasFiltradas.map((c) => (
                            <tr key={c.id}>
                                <td className={styles.td}>{c.id}</td>
                                <td className={styles.td}>{c.medico}</td>
                                <td className={styles.td}>{c.especialidade}</td>
                                <td className={styles.td}>{c.paciente}</td>
                                <td className={styles.td}>{c.tipo}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className={styles.td}>
                                Nenhuma consulta encontrada.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
