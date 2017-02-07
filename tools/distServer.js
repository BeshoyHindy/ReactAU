let express  = require('express');
let path  = require('path');
//let open  = require('open');
let compression  = require('compression');

/* eslint-disable no-console */

// Heroku dynamically assigns your app a port, so you can't set the port to a fixed number. Heroku adds the port to the env
let port = process.env.PORT || 3000;

let app = express();

app.use(compression());
app.use(express.static('dist'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});


app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    //open(`http://localhost:${port}`);
  }
});
