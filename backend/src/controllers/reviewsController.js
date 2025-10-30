const prisma = require('../prismaClient.js');

exports.createReview = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { furnitureId, rating, comment } = req.body;
        if (!furnitureId || !rating) return res.status(400).json({ error: 'furnitureId and rating required' });

        const review = await prisma.review.create({
            data: {
                userId,
                furnitureId,
                rating: parseInt(rating),
                comment
            }
        });
        res.status(201).json(review);
    } catch (err) { next(err); }
};

exports.getReviewsForFurniture = async (req, res, next) => {
    try {
        const furnitureId = parseInt(req.params.id);
        const reviews = await prisma.review.findMany({
            where: { furnitureId },
            include: { user: { select: { id: true, email: true, name: true } } },
            orderBy: { createdAt: 'desc' }
        });
        res.json(reviews);
    } catch (err) { next(err); }
};
