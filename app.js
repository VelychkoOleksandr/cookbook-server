const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//--------MONGODB ATLAS CLUSTER CONNECTION URL--------\\
const mongoDBConnectionURL = require('./meta-data/db-access')

//--------ROUTES IMPORT--------\\
const registerUser = require('./routes/register-user')
const recipesList = require('./routes/recipes-list')
const recipeByID = require('./routes/recipe-by-id')
const recipeAdd = require('./routes/recipe-add')
const recipeUpdate = require('./routes/recipe-update')
const recipeOldVerions = require('./routes/recipe-old-versions')


//--------INITIALIZE APP--------\\
const app = express()
const PORT = 9999

//--------MIDDLEWARE--------\\
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//--------ROUTES HANDLE--------\\
app.use('/register', registerUser)             // POST: '/register'

app.use('/cookbook', recipesList)              // GET: '/cookbook/:userID/recipes'
app.use('/cookbook', recipeAdd)                // PUT: '/cookbook/:userID/recipes/add'

app.use('/cookbook/recipes', recipeByID)       // GET: '/cookbook/recipes/:recipeID'
app.use('/cookbook/recipes', recipeUpdate)     // PUT: '/cookbook/recipes/:recipeID/update'
app.use('/cookbook/recipes', recipeOldVerions) // GET: '/cookbook/recipes/:recipeID/versions'

start()

async function start() {
  try {
    await mongoose.connect(mongoDBConnectionURL, { useNewUrlParser: true, useUnifiedTopology: true })

    app.listen(PORT, () => {
      console.log(`Server started on *:${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }

}