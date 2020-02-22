const { Router } = require('express')

const UserModel = require('../models/user-model')
const isError = require('../helpers/is-error')

const router = Router()

router.get('/:recipeID', async (req, res) => {
  const { recipeID } = req.params

  try {
    //--------GETTING REQUIRED RECIPE--------\\
    const recipe = (await UserModel.findOne({ 'recipes._id': recipeID }, { _id: 0, 'recipes.$': 1 })).recipes[0]

    res.json({ error: false, recipe })
  } catch (error) {
    res.json(isError(true))
  }
})

module.exports = router