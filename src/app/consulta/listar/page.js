'use client'

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
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Especialidade</th>
                        <th>Médico</th>
                        <th>Paciente</th>
                        <th>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {consulta.map((consulta) => (
                        <tr key={consulta.id}>
                            <td>{consulta.id}</td>
                            <td>{consulta.especialidade}</td>
                            <td>{consulta.medico}</td>
                            <td>{consulta.paciente}</td>
                            <td>{consulta.tipo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}