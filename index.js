const express = require('express')
const nunjucks = require('nunjucks')

const user = { age: 0 }

const app = express()
// configura o nunjuks
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'njk')

const nullAgeMiddleware = (req, res, next) => {
  req.query.age = user.age
  if (req.query.age < 1) {
    res.redirect('/')
  } else {
    return next()
  }
}

app.get('/', (req, res) => res.render('age'))

app.get('/check', (req, res) => {
  user.age = req.query.age
  if (req.query.age > 17) {
    res.redirect('/major')
  } else {
    res.redirect('/minor')
  }
})

app.get('/major', nullAgeMiddleware, (req, res) => {
  res.render('major', { age: req.query.age })
})

app.get('/minor', nullAgeMiddleware, (req, res) => {
  res.render('minor', { age: req.query.age })
})

app.listen(3000)
