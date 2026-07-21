"use client";

import { useEffect, useState } from "react";
import StyleWrapper from "../components/StylesWrapper";

export default function Perfil() {

  // 🔹 Estado del formulario (mínimo 6 campos como pide la rúbrica)
    const [form, setForm] = useState({
        id: "",
        nombre: "",
        apellido:"",
        correo: "",
        password: "",
        edad: "",
        sexo: ""
    });

    // 🔹 Mensajes (éxito o error)
    const [mensaje, setMensaje] = useState("");

    /* =========================
        CARGAR DATOS DEL USUARIO
    ========================= */
    useEffect(() => {

        // 🔸 Obtener usuario guardado en login
        const user = localStorage.getItem("usuario");

        if (!user) {
        setMensaje("No has iniciado sesión");
        return;
        }

        // 🔸 Convertir a objeto
        const userObj = JSON.parse(user);

        // 🔸 Llenar formulario con sus datos
        setForm({
        id: userObj.id,
        nombre: userObj.nombre || "",
        apellido: userObj.apellido || "",
        correo: userObj.correo || "",
        password: userObj.password || "",
        edad: userObj.edad || "",
        sexo: userObj.sexo || ""
        });

    }, []);

    /* =========================
        MANEJAR CAMBIOS
    ========================= */
    const handleChange = (e: any) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value
        });
    };

    /* =========================
        ACTUALIZAR PERFIL
    ========================= */
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
        const res = await fetch(
            `http://localhost:4000/api/perfil/${form.id}`,
            {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
            }
        );

        const data = await res.json();

        if (!res.ok) {
            setMensaje(data.error || "Error al actualizar");
            return;
        }

        // 🔸 Actualizar localStorage
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        setMensaje("Perfil actualizado correctamente");

        } catch {
        setMensaje("Error de conexión");
        }
    };

    /* =========================
        VISTA
    ========================= */
    return (
        <StyleWrapper>
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Perfil</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
                    <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Nombre"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellido:</label>
                    <input
                    type="text"
                    name="apellido"
                    value={form.apellido}
                    onChange={handleChange}
                    placeholder="Apellido"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Correo:</label>
                    <input
                    type="email"
                    name="correo"
                    value={form.correo}
                    onChange={handleChange}
                    placeholder="Correo electrónico"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña:</label>
                    <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Contraseña"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Edad:</label>
                    <input
                    type="number"
                    name="edad"
                    value={form.edad}
                    onChange={handleChange}
                    placeholder="Edad"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sexo:</label>
                    <input
                    type="text"
                    name="sexo"
                    value={form.sexo}
                    onChange={handleChange}
                    placeholder="Sexo"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                    Actualizar
                </button>
                </form>

                <p className="mt-4 text-sm text-green-600">{mensaje}</p>
            </div>
        </StyleWrapper>
    );
}