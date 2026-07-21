"use client"

import { useEffect, useState } from "react";
import StyleWrapper from './components/StylesWrapper';

export default function Home (){
    const [mensaje, setMensaje] = useState("Cargando ...");
    const [usuario, setUsuario] = useState<any>(null);

    useEffect(() => {
        const user = localStorage.getItem("usuario");

        if (!user){
            setMensaje("No has iniciado sesión");
            return;
        }

        const userObj = JSON.parse(user);
        setUsuario(userObj);

        if (userObj.rol === "admin"){
            setMensaje("Bienvenido Administrador");
        } else if(userObj.rol === "usuario"){
            setMensaje("Bienvenido usuario")
        } else {
            setMensaje("Bienvenido Cliente")
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("usuario");
        setUsuario(null);
        setMensaje("Sesión cerrada");
    };

    return(
        <StyleWrapper>
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Página principal</h1>

                <p className="text-sm text-gray-600 mb-4">{mensaje}</p>

                {usuario && (
                <div className="space-y-2">
                    <p className="text-gray-700">
                    <strong className="font-medium">Nombre:</strong> {usuario.nombre}
                    </p>
                    <p className="text-gray-700">
                    <strong className="font-medium">Correo:</strong> {usuario.correo}
                    </p>
                    <p className="text-gray-700">
                    <strong className="font-medium">Rol:</strong> {usuario.rol}
                    </p>

                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition mt-4"
                    >
                        Cerrar Sesión
                    </button>
                </div>
                )}
            </div>
            </StyleWrapper>
    )
}