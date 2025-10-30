const prisma = require('../prismaClient.js');

exports.getRecommendations = async (req, res, next) => {
    try {
        // Get user’s last 5 orders
        console.log("User ID for recommendations:", req.user.id);
        const orders = await prisma.order.findMany({
            where: { userId: req.user.id },
            include: { items: { include: { furniture: true } } },
            orderBy: { createdAt: 'desc' },
            take: 5,
        });


        const categories = [
            ...new Set(
                orders.flatMap(order => order.items.map(item => item.furniture.category))
            ),
        ];


        const recommended = await prisma.furniture.findMany({
            where: { category: { in: categories } },
            take: 6,
        });

        res.json(recommended);
    } catch (err) {
        next(err);
    }
};
