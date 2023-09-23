import { Schema, model } from 'mongoose';

export const ROLES = ["user", "admin", "moderator"];

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50,
        // Puedes agregar otras validaciones aquí, como caracteres permitidos
    },
    // description: String, // Descripción detallada del rol
    // createdBy: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'user', // Si deseas rastrear quién creó el rol y tienes un modelo de usuario
    // },
    // updatedAt: Date, // Fecha de última actualización
}, {
    timestamps: true,
    versionKey: false
});

export default model('Roles', roleSchema);
