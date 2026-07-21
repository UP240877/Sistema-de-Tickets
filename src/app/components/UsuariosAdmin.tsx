"use client"; // Permite usar hooks (useState, useEffect) en Next.js

import { useEffect, useState } from "react";
import StyleWrapper from "./StylesWrapper";

export default function UsuariosAdmin() {
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const [mensaje, setMensaje] = useState("");

    // Estado para crear un nuevo usuario con todos los campos
    const [nuevo, setNuevo] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        password: "",
        edad: "",
        sexo: "",
        rol: "cliente"
    });

    const [rol, setRol] = useState("");

    useEffect(() => {
        const user = localStorage.getItem("usuario");
        if (!user) {
        setMensaje("No has iniciado sesión");
        return;
        }

        const userObj = JSON.parse(user);
        setRol(userObj.rol);

        if (userObj.rol !== "admin") {
        setMensaje("Acceso solo para admin");
        return;
        }

        obtenerUsuarios(userObj.rol);
    }, []);

    const obtenerUsuarios = async (rolUser: string) => {
        try {
        const res = await fetch("http://localhost:4000/api/usuarios", {
            headers: { rol: rolUser }
        });
        const data = await res.json();
        setUsuarios(data);
        } catch {
        setMensaje("Error al obtener usuarios");
        }
    };

    const eliminar = async (id: number) => {
        await fetch(`http://localhost:4000/api/usuarios/${id}`, {
        method: "DELETE",
        headers: { rol }
        });
        obtenerUsuarios(rol);
    };

    const desbloquear = async (id: number) => {
        await fetch(`http://localhost:4000/api/usuarios/${id}/unlock`, {
        method: "PUT",
        headers: { rol }
        });
        obtenerUsuarios(rol);
    };

    const crearUsuario = async (e: any) => {
        e.preventDefault();
        await fetch("http://localhost:4000/api/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            rol
        },
        body: JSON.stringify(nuevo)
        });

        setNuevo({
        nombre: "",
        apellido: "",
        correo: "",
        password: "",
        edad: "",
        sexo: "",
        rol: "cliente"
        });

        obtenerUsuarios(rol);
    };

    return (
        <StyleWrapper>
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Administración de Usuarios</h1>
                <p className="text-sm text-red-600 mb-4">{mensaje}</p>

                {rol === "admin" && (
                <>
                    {/* Crear usuario */}
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Crear usuario</h2>
                    <form onSubmit={crearUsuario} className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
                        <input
                        placeholder="Nombre"
                        value={nuevo.nombre}
                        onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Apellido:</label>
                        <input
                        placeholder="Apellido"
                        value={nuevo.apellido}
                        onChange={(e) => setNuevo({ ...nuevo, apellido: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Correo:</label>
                        <input
                        placeholder="Correo"
                        value={nuevo.correo}
                        onChange={(e) => setNuevo({ ...nuevo, correo: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña:</label>
                        <input
                        type="password"
                        placeholder="Password"
                        value={nuevo.password}
                        onChange={(e) => setNuevo({ ...nuevo, password: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Edad:</label>
                        <input
                        placeholder="Edad"
                        value={nuevo.edad}
                        onChange={(e) => setNuevo({ ...nuevo, edad: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sexo:</label>
                        <input
                        placeholder="Sexo"
                        value={nuevo.sexo}
                        onChange={(e) => setNuevo({ ...nuevo, sexo: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rol:</label>
                        <select
                        value={nuevo.rol}
                        onChange={(e) => setNuevo({ ...nuevo, rol: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                        <option value="cliente">Cliente</option>
                        <option value="usuario">Usuario</option>
                        <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                    >
                        Crear
                    </button>
                    </form>

                    {/* Lista de usuarios */}
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de usuarios</h2>
                    <ul className="space-y-2">
                    {usuarios.map((u) => (
                        <li
                        key={u.id}
                        className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-md shadow-sm"
                        >
                        <span className="text-gray-700">
                            {u.nombre} {u.apellido} - {u.correo} - {u.rol} -{" "}
                            {u.bloqueado ? "🔒" : "✔"}
                        </span>
                        <div className="flex space-x-2">
                            <button
                            onClick={() => eliminar(u.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                            >
                            Eliminar
                            </button>
                            {u.bloqueado && (
                            <button
                                onClick={() => desbloquear(u.id)}
                                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                            >
                                Desbloquear
                            </button>
                            )}
                        </div>
                        </li>
                    ))}
                    </ul>
                </>
                )}
            </div>
        </StyleWrapper>

    );
}
