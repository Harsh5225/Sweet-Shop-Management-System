import express from 'express';
import {
    createSweet,
    getAllSweets,
    searchSweets,
    updateSweet,
    deleteSweet,
    purchaseSweet,
    restockSweet
} from '../controllers/sweetController.js';
import { authmiddleware, adminmiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Search route must be before generic /:id routes to avoid conflict
router.get('/search', authmiddleware, searchSweets);

router.post('/:id/purchase', authmiddleware, purchaseSweet);
router.post('/:id/restock', authmiddleware, adminmiddleware, restockSweet);

router.route('/')
    .post(authmiddleware, adminmiddleware, createSweet)
    .get(authmiddleware, getAllSweets);

router.route('/:id')
    .put(authmiddleware, adminmiddleware, updateSweet)
    .delete(authmiddleware, adminmiddleware, deleteSweet);

export default router;
