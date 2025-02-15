"use client"; // Para usar useState e useEffect no Next.js

import { useState, useEffect } from "react";

export default function MedicoPage() {
    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Substitua pela URL correta da sua API quando estiver online
        fetch("http://localhost:5000/medicos")  
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Erro ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setMedicos(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao buscar médicos:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Carregando médicos...</p>;
    }

    return (
        <div>
            <h1>Listagem de Médicos</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>Especialidade</th>
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
    );
}
