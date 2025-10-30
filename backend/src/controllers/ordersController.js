const prisma = require('../prismaClient');

exports.createOrder = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { items } = req.body; // items: [{ furnitureId, quantity }]

        if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'items required' });

        // fetch furniture and compute total securely on server
        const furnitureIds = items.map(i => i.furnitureId);
        const furnitures = await prisma.furniture.findMany({ where: { id: { in: furnitureIds } } });

        // map id->object
        const byId = {};
        furnitures.forEach(f => byId[f.id] = f);

        let total = 0;
        const orderItemsData = items.map(i => {
            const f = byId[i.furnitureId];
            const qty = i.quantity || 1;
            const price = f ? f.price : 0;
            total += price * qty;
            return {
                furnitureId: i.furnitureId,
                quantity: qty,
                price
            };
        });

        const order = await prisma.order.create({
            data: {
                userId,
                total,
                items: { create: orderItemsData }
            },
            include: { items: true }
        });

        res.status(201).json(order);
    } catch (err) { next(err); }
};

exports.getOrderById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const order = await prisma.order.findUnique({
            where: { id },
            include: { items: { include: { furniture: true } } }
        });
        if (!order) return res.status(404).json({ error: 'Not found' });
        if (order.userId !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
        res.json(order);
    } catch (err) { next(err); }
};

exports.getOrdersForUser = async (req, res, next) => {
    try {
        const orders = await prisma.order.findMany({
            where: { userId: req.user.id },
            include: { items: { include: { furniture: true } } },
            orderBy: { createdAt: 'desc' }
        });
        res.json(orders);
    } catch (err) { next(err); }
};
