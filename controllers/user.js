import User from '../models/user.js';

const usersController = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find().select('-password').populate('rol');
            return res.json(users);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            return res.status(500).json({ error: "Error al obtener usuarios" });
        }
    },

    updateUserById: async (req, res) => {
        try {
            const { email, rol } = req.body;
      
            if (!email && !rol) {
              return res.status(201).json({ msg: "User not updated, without changes" });
            }
      
            const updatedUser = {
              email,
              rol,
            };

            const userUpdated = await User.findByIdAndUpdate(req.params.id, updatedUser);

            if (userUpdated) {
                return res.status(201).json({ msg: "User updated successfully" });
              } else {
                return res.status(404).json({ msg: "User not found" });
              }
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            return res.status(500).json({ error: "Error al actualizar usuario" });
        }
    },

    activateUser: async (req, res) => {
        try {
            await User.findByIdAndUpdate(req.params.id, { state: 1 });
            return res.status(201).json({ msg: 'User activated successfully' });
        } catch (error) {
            console.error("Error al activar usuario:", error);
            return res.status(500).json({ error: "Error al activar usuario" });
        }
    },

    deactivateUser: async (req, res) => {
        try {
            const userUpdated = await User.findByIdAndUpdate(req.params.id, { state: 0 });

            if (userUpdated) {
                return res.status(201).json({ msg: "User deactivated successfully" });
            } else {
                return res.status(404).json({ msg: "User not found" });
            }
        } catch (error) {
            console.error("Error al desactivar usuario:", error);
            return res.status(500).json({ error: "Error al desactivar usuario" });
        }
    },

    deleteUserById: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            return res.status(204).json({ msg: 'User deleted successfully' });
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            return res.status(500).json({ error: "Error al eliminar usuario" });
        }
    }
};

export default usersController;
