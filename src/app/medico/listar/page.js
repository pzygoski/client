'use client'

import { useEffect, useState } from "react"

export default function Medicos() {
    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(true);

    const listaMedicos = async () => {
        try {
            const response = await fetch('https://api-clinica-2a.onrender.com/medicos');
            const dados = await response.json();
            setMedicos(dados);
        } catch {
            console.error('Nenhum médico encontrado:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        listaMedicos()
    }, [])

    if (loading) {
        console.log('Carregando lista de médicos...')
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>nome</th>
                        <th>telefone</th>
                        <th>email</th>
                        <th>especialidade</th>
                    </tr>
                </thead>
                <tbody>
                    {medicos.map((medico) => (
                        <tr key={medico.id}>
                            <td>{medico.id}</td>
                            <td>{medico.nome}</td>
                            <td>{medico.telefone}</td>
                            <td>{medico.email}</td>
                            <td>{medico.especialidade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}