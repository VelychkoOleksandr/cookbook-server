const { Router } = require('express')

const UserModel = require('../models/user-model')
const isError = require('../helpers/is-error')

const router = Router()

router.get('/:userID/recipes', async (req, res) => {
  const { userID } = req.params

  try {
    //--------GETTING LIST OF RECIPES--------\\
    const recipesList = (await UserModel.findOne({ _id: userID })).recipes

    res.json({ error: false, recipesList })
  } catch (error) {
    res.json(isError(true))
  }
})

module.exports = router