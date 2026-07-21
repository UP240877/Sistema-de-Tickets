// src/components/Navbar.tsx
"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import StyleWrapper from './StylesWrapper';

type Usuario = {
    nombre: string;
    rol: string;
};

export default function Navbar() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        const data = localStorage.getItem("usuario");
        if (data) {
        setUsuario(JSON.parse(data));
        }
    }, []);

    const isLoggedIn = !!usuario;

    const handleLogout = () => {
        localStorage.removeItem("usuario");
        window.location.href = "/login"; // recarga y redirige
    };

    return (
                <nav className="bg-white shadow-md px-7 py-2 rounded-md">
                    <div className="flex justify-between items-center">
                    
                    {/* Logo */}
                    <span className="text-lg font-bold text-blue-600">UPA APP</span>

                    {/* Links principales */}
                    <div className="flex space-x-10">
                        
                        <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
                            Inicio
                        </Link>
                    </div>

                    <div>

                        {['admin', 'administrador'].includes(usuario?.rol || '') && (
                        <Link href="/usuariosAdmin" className="text-gray-700 hover:text-blue-600 transition flex space-x-10">
                            Usuarios Admin
                        </Link>
                        )}
                    </div>

                    {/* Sección derecha */}
                        <div className="flex space-x-10 items-center">
                        {isLoggedIn && (
                            <Link href="/perfil" className="text-gray-700 hover:text-blue-600 transition">
                            Perfil
                            </Link>
                        )}

                        {isLoggedIn ? (
                            <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-7 py-2 rounded-md hover:bg-red-600 transition"
                            >
                            Cerrar Sesión
                            </button>
                        ) : (
                            <Link
                            href="/login"
                            className="bg-blue-600 text-white px-7 py-2 rounded-md hover:bg-blue-700 transition"
                            >
                            Iniciar Sesión
                            </Link>
                        )}
                        </div>

                    </div>
                </nav>
    );
}