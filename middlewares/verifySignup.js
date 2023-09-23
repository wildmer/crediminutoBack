import User from "../models/user.js";

/**
 * Middleware para verificar si el email a actualizar es duplicado.
 * @param {object} req - Objeto de solicitud.
 * @param {object} res - Objeto de respuesta.
 * @param {function} next - Función para pasar al siguiente middleware.
 */
export const checkChangeDuplicateEmail = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (user && user.email === req.body.email) {
            delete req.body.email; // Elimino la propiedad email
        }
        next();
    } catch (error) {
        console.error("Error al verificar el email duplicado:", error);
        return res.status(500).json({ error: "Error al verificar el email duplicado" });
    }
};

/**
 * Middleware para verificar si el email es duplicado al crear un nuevo usuario.
 * @param {object} req - Objeto de solicitud.
 * @param {object} res - Objeto de respuesta.
 * @param {function} next - Función para pasar al siguiente middleware.
 */
export const checkDuplicateEmail = async (req, res, next) => {
    try {
        const existingEmail = await User.findOne({ email: req.body.email });
        if (existingEmail) {
            return res.status(400).json({ msg: "El email ya existe" });
        }
        next();
    } catch (error) {
        console.error("Error al verificar el email duplicado:", error);
        return res.status(500).json({ error: "Error al verificar el email duplicado" });
    }
};

/**
 * Middleware para verificar si los roles proporcionados existen en la aplicación.
 * @param {object} req - Objeto de solicitud.
 * @param {object} res - Objeto de respuesta.
 * @param {function} next - Función para pasar al siguiente middleware.
 */
export const checkChangeSomeRoles = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (user && (
            req.body.rol === 0 || user.rol._id === req.body.rol.id)) {
            delete req["body"]["rol"]; // Elimino la propiedad rol
        }
        next();
    } catch (error) {
        console.error("Error al verificar si es el mismo rol:", error);
        return res.status(500).json({ error: "Error al verificar si es el mismo rol" });
    }
};
