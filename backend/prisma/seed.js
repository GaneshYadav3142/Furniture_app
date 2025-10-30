const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.furniture.createMany({
        data: [
            {
                "name": "Modern Lounge Chair",
                "description": "A contemporary lounge chair crafted from solid walnut wood and soft fabric upholstery, perfect for living rooms.",
                "price": 12999,
                "imageUrl": "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
                "length": 75,
                "width": 70,
                "height": 90,
                "category": "Chair"
            },
            {
                "name": "Nordic Coffee Table",
                "description": "Minimalist coffee table with a white oak top and angled beech legs, ideal for modern interiors.",
                "price": 7999,
                "imageUrl": "https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg",
                "length": 110,
                "width": 60,
                "height": 45,
                "category": "Table"
            },
            {
                "name": "Ergonomic Mesh Office Chair",
                "description": "Ergonomic design with breathable mesh back, adjustable seat height, and tilt mechanism for maximum comfort.",
                "price": 9999,
                "imageUrl": "https://images.pexels.com/photos/210367/pexels-photo-210367.jpeg",
                "length": 70,
                "width": 70,
                "height": 120,
                "category": "Office"
            },
            {
                "name": "Queen Size Bed Frame with Headboard",
                "description": "Elegant queen-size bed with upholstered headboard and solid pine frame, offering comfort and durability.",
                "price": 25999,
                "imageUrl": "https://images.pexels.com/photos/279720/pexels-photo-279720.jpeg",
                "length": 200,
                "width": 160,
                "height": 95,
                "category": "Bed"
            },
            {
                "name": "Linen Fabric 3-Seater Sofa",
                "description": "Soft linen fabric sofa with plush cushions and sturdy wooden frame, ideal for a cozy living room setup.",
                "price": 27999,
                "imageUrl": "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg",
                "length": 220,
                "width": 85,
                "height": 85,
                "category": "Sofa"
            },
            {
                "name": "Round Glass Dining Table Set",
                "description": "Tempered glass-top dining table with four cushioned chairs, modern chrome finish design.",
                "price": 19999,
                "imageUrl": "https://images.pexels.com/photos/872831/pexels-photo-872831.jpeg",
                "length": 140,
                "width": 140,
                "height": 75,
                "category": "Dining"
            },
            {
                "name": "Solid Wood Bookshelf",
                "description": "Five-tier bookshelf made from Sheesham wood with a natural finish, perfect for living rooms or studies.",
                "price": 8999,
                "imageUrl": "https://images.pexels.com/photos/1361456/pexels-photo-1361456.jpeg",
                "length": 80,
                "width": 35,
                "height": 180,
                "category": "Storage"
            },
            {
                "name": "L-Shaped Sectional Sofa",
                "description": "Large sectional sofa with chaise lounge and stain-resistant microfiber fabric, ideal for families.",
                "price": 34999,
                "imageUrl": "https://images.pexels.com/photos/3773575/pexels-photo-3773575.jpeg",
                "length": 260,
                "width": 160,
                "height": 85,
                "category": "Sofa"
            },
            {
                "name": "Wooden Study Desk",
                "description": "Compact wooden desk with built-in shelf, suitable for study or home office setups.",
                "price": 6999,
                "imageUrl": "https://images.pexels.com/photos/269230/pexels-photo-269230.jpeg",
                "length": 120,
                "width": 60,
                "height": 75,
                "category": "Office"
            },
            {
                "name": "Metal Bunk Bed",
                "description": "Durable metal bunk bed with safety railings and powder-coated finish, perfect for kids' rooms.",
                "price": 14999,
                "imageUrl": "https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg",
                "length": 190,
                "width": 100,
                "height": 160,
                "category": "Bed"
            },
            {
                "name": "Electric Recliner Armchair",
                "description": "Motorized recliner with padded leather seat and adjustable backrest for superior comfort.",
                "price": 19999,
                "imageUrl": "https://images.pexels.com/photos/1428343/pexels-photo-1428343.jpeg",
                "length": 90,
                "width": 95,
                "height": 105,
                "category": "Chair"
            },
            {
                "name": "Entertainment TV Unit",
                "description": "Spacious TV unit with open shelves and drawers made of engineered wood and metal accents.",
                "price": 10999,
                "imageUrl": "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg",
                "length": 180,
                "width": 45,
                "height": 55,
                "category": "Storage"
            },
            {
                "name": "Outdoor Wicker Patio Set",
                "description": "Weather-resistant rattan furniture set with tempered glass table and two cushioned chairs.",
                "price": 12999,
                "imageUrl": "https://images.pexels.com/photos/210557/pexels-photo-210557.jpeg",
                "length": 150,
                "width": 150,
                "height": 90,
                "category": "Outdoor"
            },
            {
                "name": "Dressing Table with Mirror",
                "description": "Elegant dressing table featuring a full-size mirror and multiple drawers for accessories.",
                "price": 9499,
                "imageUrl": "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
                "length": 100,
                "width": 45,
                "height": 150,
                "category": "Bedroom"
            },
            {
                "name": "Bedside Nightstand",
                "description": "Compact wooden nightstand with storage drawer and shelf for bedtime essentials.",
                "price": 2999,
                "imageUrl": "https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg",
                "length": 45,
                "width": 40,
                "height": 55,
                "category": "Bedroom"
            }
        ]



    });
    console.log('Seed done');
}

main()
    .catch(e => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
