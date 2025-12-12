import Sweet from '../models/Sweet.models.js';

const createSweet = async (req, res) => {
    const { name, category, price, quantity } = req.body;

    const sweetExists = await Sweet.findOne({ name });

    if (sweetExists) {
        res.status(400).json({ message: 'Sweet already exists' });
        return;
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
        res.status(400).json({ message: 'Invalid sweet data' });
    }
};

const getAllSweets = async (req, res) => {
    const sweets = await Sweet.find({});
    res.json(sweets);
};


const searchSweets = async (req, res) => {
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
};


const updateSweet = async (req, res) => {
    const sweet = await Sweet.findById(req.params.id);

    if (sweet) {
        sweet.name = req.body.name || sweet.name;
        sweet.category = req.body.category || sweet.category;
        sweet.price = req.body.price || sweet.price;
        sweet.quantity = req.body.quantity || sweet.quantity;

        const updatedSweet = await sweet.save();
        res.json(updatedSweet);
    } else {
        res.status(404).json({ message: 'Sweet not found' });
    }
};


const deleteSweet = async (req, res) => {
    const sweet = await Sweet.findById(req.params.id);

    if (sweet) {
        await sweet.deleteOne();
        res.json({ message: 'Sweet removed' });
    } else {
        res.status(404).json({ message: 'Sweet not found' });
    }
};

export {
    createSweet,
    getAllSweets,
    searchSweets,
    updateSweet,
    deleteSweet
};
