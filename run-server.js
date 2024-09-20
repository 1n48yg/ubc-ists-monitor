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
    fs.readdir(DATA_DIR, (err, data) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }

        const retData = [];

        const years = data.filter(year => fs.statSync(path.join(DATA_DIR, year)).isDirectory());
        years.forEach(year => {
            const yearPath = path.join(DATA_DIR, year);
            const months = fs.readdirSync(yearPath).filter(month => fs.statSync(path.join(yearPath, month)).isDirectory());

            months.forEach(month => {
                const monthPath = path.join(yearPath, month);
                const files = fs.readdirSync(monthPath).filter(file => path.extname(file) === '.csv');

                files.forEach(file => {
                    retData.push({
                        year,
                        month,
                        file
                    });
                });
            });
        });

        res.json(retData);
    });
});


app.get('/latest-file', (req, res) => {
    fs.readdir(DATA_DIR, (err, data) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }

        let latestTime = 0;
        let latestFile = null;

        // Loop through each year directory
        const years = data.filter(year => fs.statSync(path.join(DATA_DIR, year)).isDirectory());
        years.forEach(year => {
            const yearPath = path.join(DATA_DIR, year);

            // Loop through each month directory
            const months = fs.readdirSync(yearPath).filter(month => fs.statSync(path.join(yearPath, month)).isDirectory());
            months.forEach(month => {
                const monthPath = path.join(yearPath, month);
                const files = fs.readdirSync(monthPath).filter(file => path.extname(file) === '.csv');

                // Check the modification time of each file
                files.forEach(csvFile => {
                    const filePath = path.join(monthPath, csvFile);
                    const fileStat = fs.statSync(filePath);

                    const currFileUpdatedTime = fileStat.mtime.getTime();
                    if (currFileUpdatedTime > latestTime) {
                        latestTime = currFileUpdatedTime;
                        latestFile = { year, month, csvFile };
                    }
                });
            });
        });

        if (latestFile) {
            res.json({ file: latestFile.csvFile, year: latestFile.year, month: latestFile.month });
        } else {
            res.status(404).send('No CSV data files were found.');
        }
    });
});

app.get('/download', (req, res) => {

    // Getting file path
    const year = req.query.year;
    const month = req.query.month;
    const filename = req.query.filename;
    const filepath = path.join(DATA_DIR, year, month, filename);

    // Get file
    if (fs.existsSync(filepath)) {
        res.download(filepath);
    } else {
        res.status(404).send('File not found');
    }
});


app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});
