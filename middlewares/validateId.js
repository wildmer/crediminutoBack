import { isValidObjectId } from 'mongoose';

/**
 * Middleware para verificar si un ID es válido.
 * @param {object} req - Objeto de solicitud.
 * @param {object} res - Objeto de respuesta.
 * @param {function} next - Función para pasar al siguiente middleware.
 */
export const checkValidId = (req, res, next) => {
    try {
        req.params.id = req.params.id.trim();

        if (!isValidObjectId(req.params.id)) {
            return res.status(404).json({ msg: `El ID: ${req.params.id} no es válido` });
        }

        next();
    } catch (error) {
        console.error("Error al verificar la validez del ID:", error);
        return res.status(500).json({ error: "Error al verificar la validez del ID" });
    }
};
