import express from 'express';
const router = express.Router();
import * as ProductRoute from '../controllers/productController.js';
import * as ValidateProduct from '../validators/productValidator.js';

router.get('/', ProductRoute.getProducts);
router.get('/:id', ProductRoute.getProductById);
router.delete('/:id', ProductRoute.deleteProduct);
router.patch('/:id', ProductRoute.updateProduct);
router.post('/add-product', ValidateProduct.validateProduct, ProductRoute.addProduct);

export default router;
