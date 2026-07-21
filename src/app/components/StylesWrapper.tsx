"use client";

import React from "react";

// Definimos un contenedor con estilos comunes
export default function StyleWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div
        style={{
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#f5f5f5",
            color: "#333",
            minHeight: "100vh",
            padding: "20px",
        }}
        >
        {children}
        </div>
    );
}
