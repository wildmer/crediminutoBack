import User from '../models/user.js';
import { generateJwtToken, checkRolesExistence } from '../middlewares/authJwt.js';

const authController = {
    signUp: async (req, res) => {
        try {
            const { name, last_name, number_id, email, password, rol } = req.body;

            const newUser = new User({
                name,
                last_name,
                number_id,
                email,
                password: await User.encryptPassword(password),
                rol,
            });

            // newUser.rol = await checkRolesExistence(rol)

            const savedUser = await newUser.save();
            return res.status(201).json({ msg: "Signup successful", msj: "Usuario creado correctamente" });
        } catch (error) {
            console.error("Error during signup:", error);
            return res.status(500).json({ error: "Error durante el registro" });
        }
    },

    signIn: async (req, res) => {
        try {
            if (req.body.email && req.body.password) {
                const userFound = await User.findOne({ email: req.body.email.trim() }).populate("rol");

                if (!userFound) {
                    return res.status(404).json({ token: null, msg: "Usuario no encontrado" });
                }

                const matchPassword = await User.comparePassword(req.body.password, userFound.password);

                if (!matchPassword) {
                    return res.status(401).json({ token: null, msg: "Contraseña inválida" });
                }

                if (!userFound.state) {
                    return res.status(401).json({ token: null, msg: "Usuario inactivo" });
                }

                const token = await generateJwtToken({
                    id: userFound._id
                });

                return res.status(200).json({ token: token });
            } else {
                return res.status(401).json({ msg: "Unauthorized" });
            }
        } catch (error) {
            console.error("Error during signin:", error);
            return res.status(500).json({ error: "Error durante el inicio de sesión" });
        }
    },
}

export {
    authController
}
