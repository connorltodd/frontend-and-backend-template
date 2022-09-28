const express = require("express");
const router = express.Router();
const connection = require("../config");

// Orders

// POST /orders
router.post('/', (request, response) => {
    const { user_id, product_ids } = request.body;
    connection.query('INSERT INTO `Order` (user_id) VALUES (?)', [user_id], (error, results) => {
        const newOrderId = results.insertId
        if (error) { 
            response.status(500).json(error);
        } else {
            const orderProducts = [];
            product_ids.map(product_id => {
                const orderProductCreation = connection.query('INSERT INTO Order_Product (order_id, product_id) VALUES (?,?)', [newOrderId, product_id], (error) => {
                    if(error) {
                        response.status(500).json(error);
                    }
                })
                orderProducts.push(orderProductCreation)
            })
            
            Promise.all(orderProducts).then((values) => {
                connection.query('SELECT *  FROM `Order` JOIN Order_Product ON Order_Product.order_id JOIN Product ON Product.id = Order_Product.product_id WHERE `Order`.id = ?',[newOrderId], (error, results) => {
                    if(error) {
                        response.status(500).json(error);
                    } else {
                        response.status(200).json(results);
                    }
                })
            });

        }
    });
});


module.exports = router;
