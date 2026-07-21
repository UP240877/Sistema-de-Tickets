"use client"

import { useRouter } from "next/navigation";
import { useState } from "react"
import StyleWrapper from "../components/StylesWrapper";
import Link from "next/link";

export default function Login(){
    const router = useRouter(); 

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:4000/api/login",{
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({ correo, password })
            });

            const data = await res.json();

            if (!res.ok) {
                setMensaje(data.error || "Error en login");
                return;
            }

            // Guardar usuario (simulación de sesión)
            localStorage.setItem("usuario", JSON.stringify(data.usuario));

            setMensaje("Login exitoso");

            // ✅ Redirección correcta
            router.push("/");
        } catch (error) {
            setMensaje("Error de conexión");
        }
    };

    return (
        <StyleWrapper>
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Correo:</label>
                    <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña:</label>
                    <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                    Iniciar Sesión
                </button>

                <Link href="/registro">
                    <button type="button" className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition">
                    Registrarse
                    </button>
                </Link>
                </form>

                <p className="mt-4 text-sm text-red-600">{mensaje}</p>
            </div>
        </StyleWrapper>

    )
}
