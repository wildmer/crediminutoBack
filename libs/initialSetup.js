import Roles from '../models/roles.js';

/**
 * Crea roles por defecto si no existen en la base de datos.
 */
export const createDefaultRoles = async () => {
    try {
        // Verifica si ya existen documentos de roles.
        const count = await Roles.estimatedDocumentCount();

        // Si el contador de roles es mayor que 0, no es necesario crearlos de nuevo.
        if (count > 0) return;

        // Si el contador es igual a 0, crea los roles por defecto.
        const defaultRoles = [
            { name: 'user' },
            { name: 'moderator' },
            { name: 'admin' }
        ];

        const createdRoles = await Roles.create(defaultRoles);

        // console.log(createdRoles);

    } catch (error) {
        console.error("Error al crear roles por defecto:", error);
    }
};
