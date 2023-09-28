const express = require('express')
const router = express.Router();

const userProductController = require('../controllers/user-product.controller')

router.get('/stats1', userProductController.stats1)
router.get('/', userProductController.findAll)
router.get('/:useranme', userProductController.findOne)
router.post('/', userProductController.addProduct)
router.patch('/:username', userProductController.updateProduct)
router.delete('/:username/products/:product', userProductController.deleteProduct)

module.exports = router