const express = require('express');
const db = require('../db');
const router = express.Router();

//  Some fixed example data of amazon 
// const amazonData = {
//     items: [
//         { id: 1, name: 'Roku Express | Easy High Definition (HD) Streaming Media Player', imgName: "/img/product1.PNG", company: "by Roku" , price: "$26.00", stars: "4.5", reviewNo: "3479", specification: "This is the single page specification of product one..." },
//         { id: 2, name: 'HP 63 | 2 Ink Cartridges | Black, Tri-color | F6U61AN, F6U62AN', imgName: "/img/product2.PNG", company: "by HP", price: "$45.89", stars: "4.0", reviewNo: "374", specification: "This is the single page specification of product two..." },
//         { id: 3, name: 'Samsung 128GB 100MB/s (U3) MicroSDXC Evo Select Memory Card with Adapter (MB-ME128GA/AM)', imgName: "/img/product3.PNG", company: "by Samsung", price: "$18.99", stars: "4.5", reviewNo: "4259", specification: "This is the single page specification of product three..." },
//         { id: 4, name: 'HP OfficeJet 3830 All-in-One Wireless Printer, HP Instant Ink & Amazon Dash Replenishment ready (K7V40A)', imgName: "/img/product4.PNG", company: "by HP", price: "$99.89", stars: "4.0", reviewNo: "4218", specification: "This is the single page specification of product four..." },
//         { id: 5, name: 'Acer Aspire 5 Slim Laptop, 15.6" Full HD IPS Display, AMD Ryzen 3 3200U, Vega 3 Graphics, 4GB DDR4, 128GB SSD, Backlit Keyboard, Windows 10 in S Mode, A515-43-R19L', imgName: "/img/product5.PNG", company: "by Acer", price: "$309.99", stars: "4.5", reviewNo: "228", specification: "This is the single page specification of product five..." },
//         { id: 6, name: 'Roku Streaming Stick+ | HD/4K/HDR Streaming Device with Long-range Wireless and Voice Remote with TV Power and Volume', imgName: "/img/product6.PNG", company: "by Roku", price: "$49.95", stars: "4.0", reviewNo: "6094", specification: "This is the single page specification of product six..." }
//     ]
// }

//  Return all product information 
router.get('/', (req, res) => { 
    db.query('SELECT * FROM amazonproducts').then(results => {
        res.json(results)
    })
    .catch(() => {
        res.sendStatus(500);
    })    
});

//  Return information of a single product 
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM amazonproducts where id = ?', [req.params.id])
    .then(results => {
        res.json(results);
    })
    .catch(error => {
        console.error(error);
        res.sendStatus(500);
    });
})

router.post('/', (req, res) => {

    db.query('INSERT INTO amazonproducts (name, imgName, company, price, stars, reviewNo, specification) VALUES (?,?,?,?,?,?,?)', [req.body.name, req.body.imgName, req.body.company, req.body.price, req.body.stars, req.body.reviewNo, req.body.specification])
    .then(results => {
        console.log(results);
        res.sendStatus(201);
    })
    .catch(error => {
        console.error(error);
        res.sendStatus(500);
    });
    
});

router.delete('/:id', (req, res) => {
    db.query('DELETE FROM amazonproducts where id = ?', [req.params.id])
    .then(results => {
        res.sendStatus(200);
    })
    .catch(error => {
        console.error(error);
        res.sendStatus(500);
    });
})

module.exports = router;