const fs = require('fs');
const path = require('path');

const iconsFolder = path.join(__dirname, 'icons');
const outputFile = path.join(__dirname, 'icons.json');

fs.readdir(iconsFolder, (err, files) => {
    if (err) {
        console.error('Error reading icons folder:', err);
        return;
    }

    const svgFiles = files.filter(file =>
        file.endsWith('.svg')
    );

    fs.writeFile(outputFile, JSON.stringify(svgFiles, null, 2), (err) => {
        if (err) {
            console.error('Error writing icons.json:', err);
        } else {
            console.log('icons.json created with', svgFiles.length, 'entries');
        }
    });
});
