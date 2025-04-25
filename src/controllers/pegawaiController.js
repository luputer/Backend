const prisma = require('../config/prisma'); // ✅ cukup satu


const getAll = async (req, res) => {
    try {
        const pegawai = await prisma.simpeg_pegawai.findMany();
        res.status(200).json(pegawai);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pegawai', error });
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const pegawai = await prisma.simpeg_pegawai.findUnique({
            where: { id: parseInt(id) },
        });
        if (!pegawai) {
            return res.status(404).json({ message: 'Pegawai not found' });
        }
        res.status(200).json(pegawai);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pegawai', error });
    }
}

module.exports = {
    getAll,
    getById
}
