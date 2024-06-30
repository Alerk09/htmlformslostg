const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-form', (req, res) => {
    const formData = req.body;
    const desktopPath = path.join(require('os').homedir(), 'Desktop', 'formData.txt');
    
    fs.appendFile(desktopPath, JSON.stringify(formData) + '\n', (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).send('Internal Server Error');
        }
        res.send('OK! Now wait until someone on discord messages you.');
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
