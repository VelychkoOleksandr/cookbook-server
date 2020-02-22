const { Router } = require('express')

const UserModel = require('../models/user-model')
const isError = require('../helpers/is-error')

const router = Router()

router.get('/:recipeID/versions', async (req, res) => {
  const { recipeID } = req.params

  try {
    //--------GETTING OLD RECIPE VERSIONS--------\\
    const previousRecipeVersions = (await UserModel.findOne({ 'recipes._id': recipeID }, { _id: 0, 'recipes.$': 1 })).recipes[0].previousVersions

    res.json({ error: false, previousRecipeVersions })
  } catch (error) {
    res.json(isError(true))
  }
})

module.exports = router