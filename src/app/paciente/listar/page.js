'use client'

import { useState, useEffect } from "react"

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
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>CPF</th>
                    </tr>
                </thead>
                <tbody>
                    {pacientes.map((paciente) => (
                        <tr key={paciente.id}>
                            <td>{paciente.id}</td>
                            <td>{paciente.nome}</td>
                            <td>{paciente.telefone}</td>
                            <td>{paciente.email}</td>
                            <td>{paciente.cpf}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}