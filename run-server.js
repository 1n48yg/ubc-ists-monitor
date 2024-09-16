const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const DATA_DIR = path.join(__dirname, 'data');

app.use(express.static(path.join(__dirname + '/frontend')));
app.use(express.static(path.join(__dirname + '/data')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/files', (req, res) => {
    fs.readdir(DATA_DIR, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }
        const csvFiles = files.filter(file => path.extname(file) === '.csv');
        res.json(csvFiles);
    });
});

app.get('/latest-file', (req, res) => {
    fs.readdir(DATA_DIR, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }
        const csvFiles = files.filter(file => path.extname(file) === '.csv');
        if (csvFiles.length === 0) {
            return res.status(404).send('No CSV files found');
        }
        const latestFile = csvFiles.map(file => ({
            file,
            time: fs.statSync(path.join(DATA_DIR, file)).mtime
        })).sort((a, b) => b.time - a.time)[0].file;
        res.json({ latestFile });
    });
});

app.get('/download', (req, res) => {
    const filename = req.query.filename;
    const filepath = path.join(DATA_DIR, filename);
    res.download(filepath);
});

app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});
