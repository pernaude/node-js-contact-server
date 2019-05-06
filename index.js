require("babel-register")
const nodemailer = require("nodemailer");
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000






express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/v1', (req, res) => res.send("Welcome to Test API V1"))
  .get('/users', (req, res) => {
    res.send(`List of members ${ PORT }`)
  })
  .get('/', (req, res) => res.redirect('/v1'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
