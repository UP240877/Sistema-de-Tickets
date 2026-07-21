"use client"

import { useState } from "react"
import StyleWrapper from "../components/StylesWrapper";

export default function Registro (){
    const[form, setForm] = useState({
        nombre: "",
        apellido:"",
        correo: "",
        password: "",
        edad: "",
        sexo: ""
    })

    const [mensaje, setMensaje] = useState("");

    const limpiarForm = () => {
                setForm({
                    nombre: "",
                    apellido: "",
                    correo: "",
                    password: "",
                    edad: "",
                    sexo: ""
                });
            }

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try{
            const res = await fetch("http://localhost:4000/api/registro", {
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (!res.ok){
                setMensaje(data.error || "Error en registro");
                return;
            }

            setMensaje("Usuario registrado correctamente");

            limpiarForm()
        }
        catch (error){
            setMensaje("Error de conexión");
        }
    };

    return(
        <StyleWrapper>
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Registro</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
                    <input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md 
                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellido:</label>
                    <input
                    name="apellido"
                    value={form.apellido}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md 
                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Correo:</label>
                    <input
                    name="correo"
                    value={form.correo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md 
                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña:</label>
                    <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md 
                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Edad:</label>
                    <input
                    name="edad"
                    value={form.edad}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md 
                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sexo:</label>
                    <input
                    name="sexo"
                    value={form.sexo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md 
                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md 
                            hover:bg-blue-700 transition"
                >
                    Registrar
                </button>
                </form>

                <p className="mt-4 text-sm text-red-600">{mensaje}</p>
            </div>
            </StyleWrapper>

    )
}