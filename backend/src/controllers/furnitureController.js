const prisma = require('../prismaClient');

exports.getAll = async (req, res, next) => {
    try {
        const items = await prisma.furniture.findMany({
            orderBy: {
                price: 'asc',
            },
        });
        res.json(items);
    } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
    console.log(req)
    try {
        const id = parseInt(req.params.id);
        const item = await prisma.furniture.findUnique({ where: { id } });
        if (!item) return res.status(404).json({ error: 'Not found' });
        res.json(item);
    } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
    try {
        const { name, description, price, imageUrl, length, width, height, category } = req.body;
        if (!name || !price) return res.status(400).json({ error: 'name and price required' });

        const furniture = await prisma.furniture.create({
            data: { name, description, price: parseFloat(price), imageUrl, length, width, height, category }
        });
        res.status(201).json(furniture);
    } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const updated = await prisma.furniture.update({ where: { id }, data });
        res.json(updated);
    } catch (err) { next(err); }
};
