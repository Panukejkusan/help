const express = require("express");
const { array } = require("yargs");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');  
require("dotenv").config();
app.use(express.json());
const client = new MongoClient (process.env.CONNECTION_STRING, { serverApi: ServerApiVersion.v1 });



async function main() {
  client.connect()
  .then(() => {

    const database = client.db(process.env.DATABASE_NAME);
    const tasksCollection = database.collection("tasks");


    app.get('/heartbeat', async (req, res) => {
      const myDate = new Date().toDateString();
      const myTime = new Date().toTimeString();
      try {
      await res.send(`Aktualna data i godzina: ${myDate} ${myTime}`);
      } catch {
        res.statusCode = 400;
        res.send("coś poszło nie tak kolego");
      }
    });
    
    app.post('/add', async (req, res) => {
      const title = req.body.title;
      const body = req.body.body;
      const author = req.body.author;
      const category = req.body.category;
      const tags = req.body.tags;
      const price = req.body.price;
      if (title.length >= 100 ||
        body.length >= 300 ||
        author.length >= 20 ||
        !isCategoryValid(category) ||
        tags.length >= 4 ||
        isNaN(price)
      ) {
      res.statusCode = 400;
      res.send("coś wpisałeś nie tak kolego");
      } else {
      try {
      const myTask = await tasksCollection.insertOne({title, body, author, category, tags, price});
      res.send("pomyślnie dodano ogłoszenie kolego")}
      catch {
        res.statusCode = 400;
        res.send("coś wpisałeś nie tak kolego");
      }};
    });
    
    
    
    app.get('/get/:id', async (req, res) => {
      const id = {_id: new ObjectId(req.params)};
      try {
        const chosenAnnoucment = await tasksCollection.findOne(id);
        await res.format({
              'text/plain': function () {
                res.send(JSON.stringify(chosenAnnoucment));
              },
            
              'text/html': function () {
                res.send(`<!DOCTYPE html>
                <html>
                <h1>${JSON.stringify(chosenAnnoucment.title)}</h1><br>
                <h3>${JSON.stringify(chosenAnnoucment.body)}</h3><br>
                <h2>${JSON.stringify(chosenAnnoucment.author)}</h2><br>
                <h3>${JSON.stringify(chosenAnnoucment.category)}</h3><br>
                <h3>${JSON.stringify(chosenAnnoucment.tags[0])}
                ${JSON.stringify(chosenAnnoucment.tags[1])}
                ${JSON.stringify(chosenAnnoucment.tags[2])}</h3><br>
                <h2>${JSON.stringify(chosenAnnoucment.price)}</h2>
                </html>
                `);
              },
            
              'application/json': function () {
                res.send(chosenAnnoucment);
              },
            })
          } catch {
            res.statusCode = 400;
            res.send("coś nie pykło kolego");
          }; 
    });
    
    app.get('/all', async (req, res) => {
      try {
        const list = await tasksCollection.find({}).toArray();
        res.json(list);
      } catch (error) {
        res.statusCode = 400;
        res.send(`nie tak kolego: ${JSON.stringify(error)}`);
      }
    });
    
    app.delete('/delete/:id', async (req, res) => {
      let id = {_id: new ObjectId(req.params)};
      const chosenAnnoucment = await tasksCollection.findOne(id);
        if(chosenAnnoucment === null){
          res.statusCode = 400;
          res.send("nie znaleziono takiego id");
        } else {
          try {
            const result = await tasksCollection.deleteOne(id);
            res.statusCode = 200;
            res.send("pomyślnie usunięto ogłoszenie kolego");
            } 
          catch (e) {
            res.statusCode = 400;
            res.send("coś poszło nie tak kolego");
          }}
    });
    
    app.get('/modify/:id', async (req, res) => {
      let id = {_id: new ObjectId(req.params)};
      try {
      let chosenTask = await tasksCollection.findOne(id);
      res.statusCode = 200; // dobry status??
      res.json(chosenTask);
      } catch (error) {
        res.statusCode = 400;
        res.send("coś poszło nie tak kolego");
      }
    });
    
    app.post('/modify/:id', async (req, res) => {
      let id = {_id: new ObjectId(req.params)};
      try {
      const chosenAnnoucment = await tasksCollection.findOne(id);
      chosenAnnoucment.price = req.body.price;
      chosenAnnoucment.body = req.body.body;
      chosenAnnoucment.category = req.body.category;
      chosenAnnoucment.tags = req.body.tags;
      chosenAnnoucment.title = req.body.title;
      await tasksCollection.insertOne(chosenAnnoucment);
      res.statusCode = 200;
      res.redirect('/all');
      } catch {
        res.statusCode = 400;
        res.send("coś wpisałeś nie tak kolego");
      } 
    });
    
    app.get('/search/', async (req, res) => {
      const myQuery = {"title": {"$regex": req.body.title}};
      try {
        const filteredTasks = await tasksCollection.find(myQuery).toArray(); 
        res.json(filteredTasks);
      } catch {
        res.statusCode = 400;
        res.send("coś poszło nie tak kolego");
      }
    });
  })
}

main()
.then(console.log('db connection works fine'))
.catch(console.error)
.finally(() => client.close());

function isCategoryValid(myCategory){
  if (myCategory === "Książki" || 
      myCategory === "Sport" ||
      myCategory === "Narzędzia") {
    return true;
  } else {
    return false;
  }
};



app.listen(4700, console.log('server started'));