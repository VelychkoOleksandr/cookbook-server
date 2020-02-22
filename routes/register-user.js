const { Router } = require('express')

const UserModel = require('../models/user-model')
const isError = require('../helpers/is-error')

const router = Router()

router.post('/', async (req, res) => {
  try {
    const { name, password, email } = JSON.parse(req.body.user)
    const userExists = await UserModel.findOne({ name, password, email })

    if (!userExists) {
      const newUser = new UserModel({ name, password, email })

      //--------SAVING NEW USER--------\\
      await newUser.save()

      res.json(isError(false))
      return;
    }

    //--------REJECT IN CASE OF USER ALREADY EXISTS--------\\
    throw new Error('User already exists')

  } catch (error) {
    res.json(isError(true))
  }
})

module.exports = router

