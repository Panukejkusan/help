const express = require("express");
const app = express();

app.get('/heartbeat', (req, res) => {
    const myDate = new Date().toDateString();
    const myTime = new Date().toTimeString();
    res.send(`Aktualna data i godzina: ${myDate} ${myTime}`);
  });

app.listen(4700, console.log('server started'));