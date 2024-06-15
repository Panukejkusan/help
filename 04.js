const express = require("express");
const app = express();

app.use(express.json());

app.get('*', (req, res) => {
    res.format({
        'text/plain': function () {
          res.send('hey')
        },
      
        'text/html': function () {
          res.send('<p>hey</p>')
        },
      
        'application/json': function () {
          res.send({ message: 'hey' })
        }
        default: function () {
          // log the request and respond with 406
          res.status(406).send('Not Acceptable')
        }
      });
});

app.listen(4700, console.log('server started'));