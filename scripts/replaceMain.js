const fs = require('fs-extra');

fs.readFile('./build/package.json', 'utf8', function(err, data) {
    if (err) {
        return console.log(err);
    }
    var result = data.replace(/src\/main\.ts/g, 'main.js');
    fs.writeFile('./build/package.json', result, 'utf8', function(err) {
        if (err) return console.log(err);
    });

    console.log('Replaced main entry point in build package.json');
});
