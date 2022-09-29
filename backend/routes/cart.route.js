const express = require("express");
const router = express.Router();
const connection = require("../config");

// CartProducts

// GET /cart/:cart_id/products
router.get('/:cart_id/products', (request, response) => {
    const { cart_id } = request.params;
    connection.query('SELECT *, Cart_Product.id as cart_product_id FROM Cart JOIN Cart_Product on Cart_Product.cart_id = Cart.id JOIN Product on Cart_Product.product_id = Product.id WHERE Cart.id = ?'
    , [cart_id], (error, results) => {
        if (error) { 
            response.status(500).json(error);
        } else {
            response.status(200).json(results);
        }
    });
});

// POST /cart/:cart_id/products/:product_id
router.post('/:cart_id/products/:product_id', (request, response) => {
    const { cart_id, product_id } = request.params;

    connection.query('INSERT INTO Cart_Product (product_id, cart_id) VALUES (?,?)', [product_id, cart_id],(error, results) => {
        if (error) response.status(500).json(error);
        
        const newCartProductId = results.insertId;
        connection.query(`
            SELECT *, Cart_Product.id as cart_product_id From Product 
            JOIN Cart_Product ON Cart_Product.product_id = Product.id 
            WHERE Cart_Product.id = ?`,
            [newCartProductId],
            (error, results) => {
                if (error) { 
                    response.status(500).json(error);
                } else {
                    response.status(200).json(results);
                }
            }
        )
    })
});

// update quantity of cart product
// PUT /cart/:cart_id/products/:cart_product_id
router.put('/:cart_id/products/:cart_product_id', (request, response) => {
    const { cart_product_id } = request.params;
    const { quantity, } = request.body;

    connection.query('UPDATE Cart_Product SET quantity = ? WHERE id = ?', [quantity, cart_product_id],(error, results) => {
        if (error) response.status(500).json(error);
        
        connection.query(`
            SELECT *, Cart_Product.id as cart_product_id From Product 
            JOIN Cart_Product ON Cart_Product.product_id = Product.id 
            WHERE Cart_Product.id = ?`,
            [cart_product_id],
            (error, results) => {
                if (error) { 
                    response.status(500).json(error);
                } else {
                    response.status(200).json(results);
                }
            }
        )
    })
});

// DELETE BY ID /cart/:cart_id/cartProducts/:cart_product_id
router.delete('/:cart_id/products/:cart_product_id', (request, response) => {
    const { cart_product_id } = request.params;
    connection.query('DELETE from Cart_Product where id = ?', [cart_product_id], (error, results) => {
        console.log(results)
        if (error) { 
            response.status(500).json(error);
        } else {
            response.status(200).json({
                message: 'The product was successfully deleted from the cart'
            });
        }
    });
});


module.exports = router;


