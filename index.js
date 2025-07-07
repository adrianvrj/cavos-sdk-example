import express from "express";
import { CavosAuth } from "cavos-service-sdk";
import dotenv from "dotenv"; // Agrega esta línea

dotenv.config(); // Carga las variables de entorno

const app = express();
app.use(express.json());

app.post("/api/v1/auth/register", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    try {
        await CavosAuth.signUp(
            email,
            password,
            process.env.CAVOS_API_KEY,
        );
        return res.status(201).json({ message: "Usuario registrado exitosamente." });
    } catch (error) {
        // Maneja el error específico de usuario ya registrado
        if (
            error.message &&
            error.message.includes("already registered")
        ) {
            return res.status(409).json({ error: "Este correo ya está registrado en la organización." });
        }
        console.error("Error al registrar el usuario:", error);
        return res.status(500).json({ error: "Error al registrar el usuario." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});