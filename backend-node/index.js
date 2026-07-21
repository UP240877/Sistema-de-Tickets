const express = require("express");
const cors = require("cors");

const PORT = 4000;
const app = express();

app.use(cors());
app.use(express.json());

// Base de datos simulada
let usuarios = [
    {
        id: 1,
        nombre: "Carlos",
        apellido: "Martinez",
        correo: "carlos@gmail.com",
        password: "carlos123",
        edad: "30",
        sexo: "masculino",
        rol: "admin",   // Puede ser "admin", "usuario" o "cliente"
        intentos: 0,
        bloqueado: false
    },
    {
        id: 2,
        nombre: "Ana",
        apellido: "Lopez",
        correo: "ana@example.com",
        password: "ana123",
        edad: "25",
        sexo: "femenino",
        rol: "usuario", // Rol intermedio
        intentos: 0,
        bloqueado: false
    },
    {
        id: 3,
        nombre: "Pedro",
        apellido: "Ramirez",
        correo: "pedro@example.com",
        password: "pedro123",
        edad: "40",
        sexo: "masculino",
        rol: "cliente", // Rol por defecto
        intentos: 0,
        bloqueado: false
    }
];


// Middleware para validar admin
const esAdmin = (req, res, next) => {
    const { rol } = req.headers;
    if (rol !== "admin") {
        return res.status(403).json({ error: "Acceso solo para administradores" });
    }
    next();
};

// Registro
app.post("/api/registro", (req, res) => {
    const { nombre, apellido, correo, password, edad, sexo, rol } = req.body;

    // Validamos solo los campos obligatorios que sí envía el frontend
    if (!nombre || !apellido || !correo || !password || !edad || !sexo) {
        return res.status(400).json({ error: "Campos obligatorios" });
    }

    // Verificamos si ya existe el correo
    const existe = usuarios.find(u => u.correo === correo);
    if (existe) {
        return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Creamos el nuevo usuario
    const nuevo = {
        id: usuarios.length + 1,
        nombre,
        apellido,
        correo,
        password,
        edad,
        sexo,
        rol: rol || "cliente", // por defecto cliente
        intentos: 0,
        bloqueado: false
    };

    usuarios.push(nuevo);

    res.status(201).json({ mensaje: "Usuario registrado", usuario: nuevo });
});


// Login
app.post("/api/login", (req, res) => {
    const { correo, password } = req.body;
    const user = usuarios.find(u => u.correo === correo);

    if (!user) {
        return res.status(404).json({ error: "Usuario no existe" });
    }

    if (user.bloqueado) {
        return res.status(403).json({ error: "Usuario bloqueado" });
    }

    if (user.password !== password) {
        user.intentos++;
        if (user.intentos >= 3)
        user.bloqueado = true;
        return res.status(401).json({
        error: "Contraseña incorrecta",
        intentos: user.intentos
        });
    }

    user.intentos = 0;
    res.json({ mensaje: "Login correcto", usuario: user });
});

// Editar perfil
app.put("/api/perfil/:id", (req, res) => {
    const { id } = req.params;
    const user = usuarios.find(u => u.id == id);

    if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    Object.assign(user, req.body);
    res.json({ mensaje: "Perfil actualizado", usuario: user });
});

// Obtener usuarios (solo admin)
app.get("/api/usuarios", esAdmin, (req, res) => {
    res.json(usuarios);
});

// Crear usuario (solo admin)
app.post("/api/usuarios", esAdmin, (req, res) => {
    const nuevo = {
        id: usuarios.length + 1,
        ...req.body,
        intentos: 0,
        bloqueado: false
    };
    usuarios.push(nuevo);
    res.json({ mensaje: "Usuario creado", usuario: nuevo });
});

// Eliminar usuario (solo admin)
app.delete("/api/usuarios/:id", esAdmin, (req, res) => {
    const { id } = req.params;
    const index = usuarios.findIndex(u => u.id == id);
    if (index === -1) return res.status(404).json({ error: "Usuario no encontrado" });
    usuarios.splice(index, 1);
    res.json({ mensaje: "Usuario eliminado" });
});

// Desbloquear usuario (solo admin)
app.put("/api/usuarios/:id/unlock", esAdmin, (req, res) => {
    const { id } = req.params;
    const user = usuarios.find(u => u.id == id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    user.bloqueado = false;
    user.intentos = 0;
    res.json({ mensaje: "Usuario desbloqueado", usuario: user });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
