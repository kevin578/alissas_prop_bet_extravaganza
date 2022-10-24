const express = require('express')
const router = express.Router()

router.get('/sign-up', (req, res) => {
  res.render('users/sign-up')
})

router.post('/sign-up', (req, res) => {
  res.render('users/sign-up')
})

module.exports = router
