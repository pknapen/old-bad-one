const express = require('express');
const app = express();
const port = 4000;
const amazonComponent = require('./components/amazon');
const bodyParser = require('body-parser');
const apiKeyDemo = require('./components/apiKeyDemo');
var cors = require('cors');
const db = require('./db');

app.use(bodyParser.json());
app.use(cors())

/* demonstrate route module/component usage - the dogComponent content is defined in separate file */
app.use('/amazon', amazonComponent);

app.use('/apiKey', apiKeyDemo);

/* DB init */
Promise.all(    
    [
        db.query(`CREATE TABLE IF NOT EXISTS amazonproducts(
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(1000),
            imgName VARCHAR(256),
            company VARCHAR(32),
            price VARCHAR(32),
            stars VARCHAR(32),
            reviewNo VARCHAR(32),
            specification VARCHAR(256)
        )`)
        // Add more table create statements if you need more tables
    ]
).then(() => {
    app.listen(port, () => {
        console.log(`Listening on http://localhost:${port}\n`);
    });
});