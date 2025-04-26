const prisma = require('../config/prisma'); // 

const getAll = async (req, res) => {
    const products = await prisma.product.findMany({});
    res.status(200).json(products);
}

const postProduct = async (req, res) => {
    const { name, price, stock } = req.body;
    const product = await prisma.product.create({
        data: {
            name,
            price,
            stock
        },
    });
    res.status(201).json(product);
}



const deleteById = async (req, res) => {
    const { id } = req.params;
    const product = await prisma.product.delete({
        where: {
            id: (id)
        },
    });
    if (!product) {
        return res.status(404).json({
            message: 'Product not found'
        });
    }
    res.status(200).json(product);
}


module.exports = {
    getAll,
    postProduct,
    // getById,
    deleteById
}