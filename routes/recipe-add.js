const { Router } = require('express')

const UserModel = require('../models/user-model')
const isError = require('../helpers/is-error')

const router = Router()

router.put('/:userID/recipes/add', async (req, res) => {
  const { userID } = req.params

  try {
    const { title, description, ingredients } = JSON.parse(req.body.recipe)

    const newRecipe = {
      title,
      description,
      ingredients,
      created: Date.now(),
      updated: Date.now(),
    }

    //--------ADDING NEW RECIPE--------\\
    await UserModel.updateOne({ _id: userID }, { $push: { recipes: newRecipe } })

    res.json(isError(false))
  } catch (error) {
    res.json(isError(true))
  }
})

module.exports = router

