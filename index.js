const csv = require('csv-parser')
const fs = require('fs')
const walk = require('walk');
const results = [];

let walker = walk.walk('./data', { followLinks: false });

walker.on('file', function (root, stat, next) {
  next();
  let filename = `${stat.name}`;

  fs.createReadStream(`./data/${filename}`)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      let filenameJSON = `${stat.name}`.slice(0, -4);
      const data = JSON.stringify(results);
      fs.writeFileSync(`./json/${filenameJSON}.json`, data);
    });
});

