const prisma = require('../prismaClient.js');


exports.addFurniture = async (req, res) => {
    try {
        const { name, description, price, imageUrl, length, width, height, category } = req.body;

        const newFurniture = await prisma.furniture.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                imageUrl,
                length: length ? parseFloat(length) : null,
                width: width ? parseFloat(width) : null,
                height: height ? parseFloat(height) : null,
                category,
            },
        });

        res.status(201).json({ message: 'Furniture added successfully', data: newFurniture });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add furniture' });
    }
};


exports.getAllFurniture = async (req, res) => {
    try {
        const furnitureList = await prisma.furniture.findMany({
            include: { reviews: true },
            orderBy: { createdAt: 'desc' },
        });
        res.status(200).json(furnitureList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch furniture list' });
    }
};

exports.updateFurniture = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, imageUrl, length, width, height, category } = req.body;

        const updated = await prisma.furniture.update({
            where: { id: parseInt(id) },
            data: {
                name,
                description,
                price: price ? parseFloat(price) : undefined,
                imageUrl,
                length: length ? parseFloat(length) : undefined,
                width: width ? parseFloat(width) : undefined,
                height: height ? parseFloat(height) : undefined,
                category,
            },
        });

        res.status(200).json({ message: 'Furniture updated successfully', data: updated });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update furniture' });
    }
};
