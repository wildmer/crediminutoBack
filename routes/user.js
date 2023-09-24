import { Router } from "express";
import usersController from "../controllers/user.js";
import { authJwt, validateId, verifySignup } from "../middlewares/index.js";

const routerUser = Router();

// Ruta para obtener usuarios
routerUser.get('/', [
    authJwt.verifyJwtToken,
], usersController.getUsers);

// Ruta para actualizar usuario por ID
routerUser.put('/:id', [
    authJwt.verifyJwtToken,
    authJwt.isAuthorised,
    validateId.checkValidId,
    verifySignup.checkChangeDuplicateEmail,
    authJwt.checkRolesExistence,
    verifySignup.checkAndRemoveDuplicateRole,
], usersController.updateUserById);

// Ruta para activar usuario por ID
routerUser.put('/activate/:id', [
    authJwt.verifyJwtToken,
    authJwt.isAuthorised,
    validateId.checkValidId,
], usersController.activateUser);

// Ruta para desactivar usuario por ID
routerUser.put('/deactivate/:id', [
    authJwt.verifyJwtToken,
    authJwt.isAuthorised,
    validateId.checkValidId,
], usersController.deactivateUser);

// Ruta para eliminar usuario por ID
routerUser.delete('/:id', [
    authJwt.verifyJwtToken,
    authJwt.isAuthorised,
    validateId.checkValidId,
], usersController.deleteUserById);

export default routerUser
