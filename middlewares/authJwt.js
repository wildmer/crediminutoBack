import CONFIG from "../config.js";
import jwt from "jsonwebtoken";
import Roles from "../models/roles.js";
import User from "../models/user.js";

/**
 * Crea un token JWT a partir de un payload.
 * @param {object} payload - Datos a incluir en el token.
 * @returns {string} Token JWT generado.
 */
export async function generateJwtToken(payload) {
  const token = jwt.sign(payload, CONFIG.SECRET, {
    expiresIn: "10h",
    algorithm: "HS256",
  });

  return token;
}

/**
 * Middleware para verificar si los roles proporcionados existen en la aplicación.
 * @param {object} req - Objeto de solicitud.
 * @param {object} res - Objeto de respuesta.
 * @param {function} next - Función para pasar al siguiente middleware.
 */

export const checkRolesExistence = async (req, res, next) => {
  try {
    let assignedRole = null;

    const foundRole = await Roles.findOne({ name: req.body.rol });
    assignedRole = foundRole;

    if (!assignedRole) {
      if (!req.method === "PUT") {
        const defaultRole = await Roles.findOne({ name: "user" });
        assignedRole = defaultRole;
      }
    }

    req.body.rol = assignedRole;
    next();
  } catch (error) {
    console.error("Error al verificar la existencia del rol:", error);
    return res
      .status(500)
      .json({ error: "Error al verificar la existencia del rol" });
  }
};

/**
 * Middleware para verificar la validez de un token JWT.
 * @param {object} req - Objeto de solicitud.
 * @param {object} res - Objeto de respuesta.
 * @param {function} next - Función para pasar al siguiente middleware.
 */
export const verifyJwtToken = async (req, res, next) => {
  try {
    const token = req.headers["token"];

    if (!token) {
      return res.status(403).json({ msg: "No token provided" });
    }

    const decoded = jwt.verify(token, CONFIG.SECRET, { algorithm: "HS256" });
    req.userId = decoded.id; // Guardar el ID del usuario en la solicitud
    const user = await User.findById(req.userId, { password: 0 });

    if (!user) {
      return res.status(404).json({ msg: "No user found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
};

/**
 * Middleware para verificar si el usuario tiene el rol de moderador.
 * @param {object} req - Objeto de solicitud.
 * @param {object} res - Objeto de respuesta.
 * @param {function} next - Función para pasar al siguiente middleware.
 */
export const isModeratorRole = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const rol = await Roles.find({ _id: { $in: user.rol } });

  for (let i = 0; i < rol.length; i++) {
    if (rol[i].name === "moderator") {
      return next();
    }
  }

  return res.status(403).json({ msg: "Require Moderator Role" });
};

/**
 * Middleware para verificar si el usuario tiene el rol de administrador o moderador.
 * @param {object} req - Objeto de solicitud.
 * @param {object} res - Objeto de respuesta.
 * @param {function} next - Función para pasar al siguiente middleware.
 */

export const isAuthorizedRole = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const rol = await Roles.find({ _id: { $in: user.rol } });

  for (let i = 0; i < rol.length; i++) {
    if (rol[i].name === "moderator" || rol[i].name === "admin") {
      return next();
    }
  }

  return res.status(403).json({ msg: "Require Authorized Role" });
};

/**
 * Middleware para verificar si el usuario tiene el rol de administrador.
 * @param {object} req - Objeto de solicitud.
 * @param {object} res - Objeto de respuesta.
 * @param {function} next - Función para pasar al siguiente middleware.
 */
const isAdminRole = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const rol = await Roles.find({ _id: { $in: user.rol } });

  for (let i = 0; i < rol.length; i++) {
    if (rol[i].name === "admin") {
      return next();
    }
  }

  return res.status(403).json({ msg: "Require Admin Role" });
};
export const isAuthorised = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const rol = await Roles.find({ _id: { $in: user.rol } });

  for (let i = 0; i < rol.length; i++) {
    if (rol[i].name === "moderator" || rol[i].name === "admin") {
      next();
      return;
    }
  }
  return res.status(403).json({ msg: "Authorization required" });
  // next()
};

/**
 * Valida la validez de un token JWT.
 * @param {string} token - Token JWT a validar.
 */
const validateJwtToken = (token) => {
  jwt.verify(token, CONFIG.SECRET, (err) => {
    if (err) {
      throw new Error("Token no válido");
    }
  });
};

// export {
//     generateJwtToken,
//     validateJwtToken,
//     verifyJwtToken,
//     isModeratorRole,
//     isAdminRole,
//     isAuthorizedRole
// };
