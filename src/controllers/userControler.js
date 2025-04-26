const prisma = require('../config/prisma'); // 


const getAll = async (req, res) => {
    const users = await prisma.user.findMany({});
    res.status(200).json(users);
}


const getById = async (req, res) => {
    const {
        id
    } = req.params;
    const user = await prisma.user.findUnique({
        where: {
            id: (id)
        },
    });
    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }
    res.status(200).json(user);
}

const deleteById = async (req, res) => {
    const {
        id
    } = req.params;
    const user = await prisma.user.delete({
        where: {
            id: (id)
        },
    });
    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }
    res.status(200).json(user);
}



module.exports = {
    getAll,
    getById,
    deleteById
}