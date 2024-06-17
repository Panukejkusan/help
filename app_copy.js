const express = require("express");
const { array } = require("yargs");
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');  
require("dotenv").config();


const annoucmentList = [{
    id: 0,
    title: "lorem",
    body: "ipsum",
    author: "Janusz",
    category: "Książki",
    tags: [
      "lorem",
      "ipsum",
      "książka"
    ],
    price: 5900
}];


app.use(express.json());

const client = new MongoClient (process.env.CONNECTION_STRING, { serverApi: ServerApiVersion.v1 });

async function main() {
  client.connect()
  .then(() => {

  const database = client.db(process.env.DATABASE_NAME);
  const tasksCollection = database.collection("tasks");


  app.get('/heartbeat',  (req, res) => {
    const myDate = new Date().toDateString();
    const myTime = new Date().toTimeString();
    res.send(`Aktualna data i godzina: ${myDate} ${myTime}`);
  });
  
  app.post('/add', (req, res) => {
    const id = annoucmentList[annoucmentList.length - 1].id + 1;
    const title = req.body.title;
    const body = req.body.body;
    const author = req.body.author;
    const category = req.body.category;
    const tags = req.body.tags;
    const price = req.body.price;
    const myAnnoucment = {id, title, body, author, category, tags, price};
    const errorArray = [];
  
      // if (title && title.length >= 100 ) {
      //   errorArray.push('title');
      //   // sendErrorResponse('title');
      // }
  
      // if (errorArray.length > 0) {
      //   res.statusCode = 400;
      //   res.send("coś wpisałeś nie tak kolego");
      // }
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
      annoucmentList.push(myAnnoucment);
      tasksCollection.insertOne(myAnnoucment);
      res.json(myAnnoucment)};
      
  });
  
  
  
  app.get('/get/:id', function (req, res) {
    const {id} = req.params;
    const chosenAnnoucment = annoucmentList[id];
    if(isNaN(id) 
      // || id != annoucmentList <---- ma być sprawdzenie czy id występuje na liście ogłoszeń
    ) {
      res.statusCode = 400;
      res.send("coś nie pykło kolego");
    } else {
      res.format({
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
          // default: function (isNaN(id)) {
          //   // log the request and respond with 406
          //   res.status(406).send('Not Acceptable')
          // }
        })};
  });
  
  app.get('/all', async (req, res) => {
    try {
      const list = await tasksCollection.find({}).toArray();
      res.json(list);
    } catch (error) {
      res.statusCode = 400;
      res.send(`nie tak kasztanie: ${JSON.stringify(error)}`);
    }
    
  });
  
  app.delete('/delete/:id', async (req, res) => {
    const {id} = req.params;
    annoucmentList.splice(id, 1);
    if (isNaN(id)) 
      {res.statusCode = 400;
      res.send("coś wpisałeś nie tak kolego");} 
    else 
      try {
        await tasksCollection.deleteOne(); //TODO usuwa pierwsze ogłoszenie z listy a ma usuwać ogłoszenie z wybranym id
        res.statusCode = 204;
        res.send();
        } 
      catch (e) {
        res.statusCode = 400;
        res.send("coś wpisałeś nie tak kolego");
      } 
  });
  
  app.get('/modify/:id', function (req, res) {
    const {id} = req.params;
    const chosenAnnoucment = annoucmentList[id];
    if (isNaN(id)) {
      res.statusCode = 400;
      res.send("coś wpisałeś nie tak kolego");
    } else {
    res.statusCode = 200; // dobry status??
    res.json(chosenAnnoucment);
    }
  });
  
  app.post('/modify/:id', (req, res) => {
    const {id} = req.params;
    annoucmentList[id].price = req.body.price;
    annoucmentList[id].body = req.body.body;
    annoucmentList[id].category = req.body.category;
    annoucmentList[id].tags = req.body.tags;
    annoucmentList[id].title = req.body.title;
    if (isNaN(id)) {
      res.statusCode = 400;
      res.send("coś wpisałeś nie tak kolego");
    } else {
      res.statusCode = 200; // dobry status??
      res.redirect('/all');
    }
  });
  
  app.get('/search', (req, res) => {
    const searchResults = [];
    const fieldName = 'title'
    for (let i = 0; i < annoucmentList.length; i++){
      if (annoucmentList[i][fieldName].includes(req.body.title)){
        searchResults.push(annoucmentList[i]);
      }
    }
    res.send(searchResults);
  })


  })
  
  // const tasks = await tasksCollection.find({}).toArray(function(error, result){
    // if (error) throw error;
    // return result;
  // });
    // console.log(tasks);
    // return tasksCollection;
}

main()
.then(console.log('db connection works fine'))
.catch(console.error)
.finally(() => client.close());

function sendErrorResponse(propertyName) {
  res.statusCode = 400;
  res.send(`wpisałeś ${propertyName} nie tak kasztanie`);
}

function isCategoryValid(myCategory){
  console.log(myCategory, myCategory === "Sport")
  if (myCategory === "Książki" || 
      myCategory === "Sport" ||
      myCategory === "Narzędzia") {
    return true;
  } else {
    return false;
  }
};



app.listen(4700, console.log('server started'));

// echo "# help" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/Panukejkusan/help.git
// git push -u origin main