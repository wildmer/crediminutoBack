import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define el esquema del usuario
const userSchema = new Schema({
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    number_id: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, minlength: 8 },
    state: { type: Number, default: 1 },
    // remenber_token
    rol: {
        ref: "Roles",
        type: Schema.Types.ObjectId
    }, // Roles posibles: admin, moderator, user
}, {
    timestamps: true,
    versionKey: false
});

// Método estático para cifrar una contraseña
userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Método estático para comparar contraseñas
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}

export default model('User', userSchema);
