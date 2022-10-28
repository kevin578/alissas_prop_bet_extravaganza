const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const { dataSource } = require("../db/data-source")

router.get('/sign-up', async (req, res) => {
  res.render('users/sign-up')
})

router.post('/sign-up', async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const saved = await dataSource.getRepository("User").save({
    email: req.body.email,
    password: hash
  })
  res.render('users/sign-up')
})

router.get('/sign-in', (req, res)=> {
  res.render('users/sign-in')
})

router.post('/sign-in', async (req, res)=> {
  const userRepository = dataSource.getRepository("User")
  const selectedUser = await userRepository.findOne({
    where: { email: req.body.email }
  })
  if (!selectedUser) {
    res.render('users/sign-in')
  } 
  const passwordMatches = await bcrypt.compare(req.body.password, selectedUser.password)
  if (!passwordMatches) {
    res.render('users/sign-in')
  }; 
  res.cookie('alissapropbet_session', selectedUser.email, { signed: true })
  res.redirect('/')
})

router.post('/sign-out', (req,res)=> {
  res.clearCookie("alissapropbet_session");
  res.redirect(req.get('Referrer'))
})

module.exports = router
