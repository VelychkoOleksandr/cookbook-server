const { Router } = require('express')

const UserModel = require('../models/user-model')
const isError = require('../helpers/is-error')

const router = Router()

router.put('/:recipeID/update', async (req, res) => {
  const { recipeID } = req.params

  try {
    const { title, description, ingredients } = JSON.parse(req.body.recipe)

    //--------SAVING OLD VERSION RECIPE--------\\
    const oldRecipe = (await UserModel.findOne({ 'recipes._id': recipeID }, { _id: 0, 'recipes.$': 1 })).recipes[0]
    await UserModel.updateOne({ 'recipes._id': recipeID }, { $push: { 'recipes.$.previousVersions': oldRecipe } })

    //--------UPDATING RECIPE TO NEW VERSION--------\\
    await UserModel.updateOne({ 'recipes._id': recipeID }, {
      $set: {
        'recipes.$.title': title,
        'recipes.$.description': description,
        'recipes.$.ingredients': ingredients,
        'recipes.$.created': oldRecipe.created,
        'recipes.$.updated': oldRecipe.updated
      }
    })

    res.json(isError(false))
  } catch (error) {
    res.json(isError(true))
  }
})

module.exports = router