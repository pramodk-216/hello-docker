const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const url = process.env.BACKEND_URL || 'http://localhost:8000';
const indexPath = path.join(__dirname, 'page', 'index.html');

app.use(express.static(path.join(__dirname, 'page')));

app.get('/', (req, res) => {
    res.sendFile(indexPath);
});

app.get('/name', async (req, res) => {
    try {
        const response = await fetch(`${url}/name`);
        if (!response.ok) {
            throw new Error(`Backend responded with ${response.status}`);
        }
        const data = await response.json();
        const names = data
            .map((name) => String(name).trim())
            .filter(Boolean)
            .map((name) => `<li>${name}</li>`)
            .join('');
        const html = fs.readFileSync(indexPath, 'utf8').replace('{{ names }}', `<ul>${names}</ul>`);
        res.type('html').send(html);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error fetching names');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = app;