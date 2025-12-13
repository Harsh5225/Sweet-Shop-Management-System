import Sweet from '../models/Sweet.models.js';
import asyncHandler from '../middleware/asyncHandler.js';

const createSweet = asyncHandler(async (req, res) => {
    const { name, category, price, quantity } = req.body;

    const sweetExists = await Sweet.findOne({ name });

    if (sweetExists) {
        res.status(400);
        throw new Error('Sweet already exists');
    }

    const sweet = await Sweet.create({
        name,
        category,
        price,
        quantity
    });

    if (sweet) {
        res.status(201).json(sweet);
    } else {
        res.status(400);
        throw new Error('Invalid sweet data');
    }
});

const getAllSweets = asyncHandler(async (req, res) => {
    const sweets = await Sweet.find({});
    res.json(sweets);
});


const searchSweets = asyncHandler(async (req, res) => {
    const { name, category, minPrice, maxPrice } = req.query;

    let query = {};

    if (name) {
        query.name = { $regex: name, $options: 'i' };
    }

    if (category) {
        query.category = { $regex: category, $options: 'i' };
    }

    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(query);
    res.json(sweets);
});


const updateSweet = asyncHandler(async (req, res) => {
    const sweet = await Sweet.findById(req.params.id);

    if (sweet) {
        sweet.name = req.body.name || sweet.name;
        sweet.category = req.body.category || sweet.category;
        sweet.price = req.body.price || sweet.price;
        sweet.quantity = req.body.quantity || sweet.quantity;

        const updatedSweet = await sweet.save();
        res.json(updatedSweet);
    } else {
        res.status(404);
        throw new Error('Sweet not found');
    }
});


const deleteSweet = asyncHandler(async (req, res) => {
    const sweet = await Sweet.findById(req.params.id);

    if (sweet) {
        await sweet.deleteOne();
        res.json({ message: 'Sweet removed' });
    } else {
        res.status(404);
        throw new Error('Sweet not found');
    }
});


const purchaseSweet = asyncHandler(async (req, res) => {
    const { quantity } = req.body;
    const qtyToPurchase = quantity || 1;

    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
        res.status(404);
        throw new Error('Sweet not found');
    }

    if (sweet.quantity < qtyToPurchase) {
        res.status(400);
        throw new Error('Not enough sweets in stock');
    }

    sweet.quantity -= qtyToPurchase;
    await sweet.save();

    // Add to user's purchasedSweets
    // Note: Assuming req.user is populated by auth middleware
    if (req.user) {
        req.user.purchasedSweets.push({
            sweet: sweet._id,
            quantity: qtyToPurchase
        });
        await req.user.save();
    }

    res.json({ message: 'Purchase successful', remainingStock: sweet.quantity });
});


const restockSweet = asyncHandler(async (req, res) => {
    const { quantity } = req.body;
    const qtyToRestock = quantity || 1;

    const sweet = await Sweet.findById(req.params.id);

    if (sweet) {
        sweet.quantity += Number(qtyToRestock);
        await sweet.save();
        res.json({ message: 'Restock successful', currentStock: sweet.quantity });
    } else {
        res.status(404);
        throw new Error('Sweet not found');
    }
});

export {
    createSweet,
    getAllSweets,
    searchSweets,
    updateSweet,
    deleteSweet,
    purchaseSweet,
    restockSweet
};
