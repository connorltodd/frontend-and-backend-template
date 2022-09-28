const express = require("express");
const router = express.Router();
const connection = require("../config");

// Products

// POST /products
router.post("/",(request, response) => {
        // Creation of product
        const formData = request.body;
        connection.query('INSERT INTO Product set ?', [formData], (error, results) => {
        if (error) response.status(500).json(error)

        const newProductId = results.insertId

        // Fetching the newly created product to send to the frontend
        connection.query('SELECT * FROM Product WHERE id = ?', newProductId, (error, results) => {
            if (error) response.status(500).json(error)


            const newProduct = results
            response.status(200).send(newProduct)
        })

        })
    }
);

// GET /products
router.get('', (request, response) => {

    connection.query('SELECT * FROM Product', (error, results) => {
        if (error) res.status(500).json(error)

        const products = results;
        response.status(200).json(products)
    })
});

// GET BY ID /products/:id
router.get('/:id', (request, response) => {
    const productId = request.params.id;

    connection.query('SELECT * FROM Product WHERE id = ? ', productId, (error, results) => {
        if (error) res.status(500).json(error)

        const product = results;
        response.status(200).json(product)
    })
});

// UPDATE BY ID /products/:id
router.put('/:id', (request, response) => {
    const productId = request.params.id;
    const formData = request.body;

    connection.query('UPDATE Product SET ? WHERE id = ?', [formData, productId], (error, results) => {
        if (error) res.status(500).json(error)

        connection.query('SELECT * FROM Product WHERE id = ?', productId, (error, results) => {
            if (error) res.status(500).json(error)

            const updatedProduct = results
            response.status(200).json(updatedProduct)

        })
    })
})
// DELETE BY ID /products/:id
router.delete('/:id', (request, response) => {
    const productId = request.params.id;

    connection.query('DELETE FROM Product WHERE id = ?', productId, (error, results) => {
        if (error) response.status(500).json(error);

        response.status(200).json({
            message: 'The product was successfully deleted'
        });
    })
})

module.exports = router;
