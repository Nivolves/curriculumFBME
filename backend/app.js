const csv = require('csv-parser')
const fs = require('fs')
const walk = require('walk');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use('/data', express.static(__dirname + '/data'));


app.post('/upload', (req, res, next) => {
  let file = req.files.file;

  file.mv(`${__dirname}/data/${req.files.file.name}`, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({ file: `data/${req.files.file.name}` });
  });

})

app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(8000, () => {
  console.log('8000');
});

module.exports = app;

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
