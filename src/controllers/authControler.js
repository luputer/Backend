const prisma = require('../config/prisma'); // 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    console.log(req.body);
    const {
        username,
        email,
        password
    } = req.body;

    if (!email) {
        return res.status(400).json({
            message: 'Email is required'
        });
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (existingUser) {
        return res.status(400).json({
            message: 'Email already exists'
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            username: username,
            email: email,
            password: hashedPassword
        }
    });
    res.json({
        message: "Registrasi berhasil!",
        user: newUser
    });
}

const login = async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Log body request
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email dan password wajib diisi!"
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        console.log('User Found:', user); // Log hasil pencarian user

        if (!user) {
            return res.status(401).json({
                message: "Email tidak terdaftar!"
            });
        }

        const isPasswordValid = bcrypt.compare(password, user.password);
        console.log('Password Valid:', isPasswordValid); // Log hasil validasi password

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Password salah!"
            });
        }

        const token = jwt.sign({
            userId: user.id
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        res.status(200).json({
            message: "Login berhasil!",
            token: token,
            user: {
                id: user.id,
                name: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error:', error); // Log error
        res.status(500).json({
            message: "Terjadi kesalahan pada server."
        });
    }
};
    

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


module.exports = {
    // getById,
    getById,
    // deleteById
    login,
    register,
}