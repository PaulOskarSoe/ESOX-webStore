const express =     require('express')
const app =         express()
const PORT =        process.env.PORT || 3000
const path =        require("path")
const mongoose =    require('mongoose');
const DB =          require("./database.js")
const Item =        require('./item.model.js')
const bodyParser =  require("body-parser")
const apiRouter  =  require('./apiRouter.js')

//Check for deploying into heroku
if(process.env.NODE_ENV !== "production"){
  require('dotenv').config()
}

DBurl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_HOST}`


app.use(bodyParser.json())

app.use("/", express.static('dist'))
app.use(apiRouter)

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html" ))
})

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html" ))
})

app.get('/signup', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html" ))
})


app.get('/items', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html" ))
})


app.get('/items/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist", "index.html"))
})


function listen(){
  app.listen(PORT, () => {
    console.log("Server started", PORT);
    console.log(`http://localhost:${PORT}`)
  })
}


mongoose.connect(DBurl)
  .then(()=>{
    console.log("database is connected!")
    migrate()
    listen()
  })
  .catch(( err )=>{
    console.log(err, "  is the error")
  })



  
function migrate(){
    Item.count({}, (err, count)=>{
    if(err) throw err
    if(count > 0){ 
      console.log("Already had items, don't save! ")
      return 
    }
    saveAllItems()
  })
  
}

function deleteAllItems(){
  Item.deleteMany({}, (err, doc) =>{
    console.log("err", err, doc ,"doc");
    
  })
}


function saveAllItems(){
  console.log("migrate started")
  const items = DB.getItems()
  items.forEach(item => {
    const document = new Item(item)
    document.save((err) =>{
      if(err){
        console.log(err)
        throw new Error("Some thing happened during save!")
      }
      console.log("Save success") 
    })
  })
  console.log("items ->", items);
}
