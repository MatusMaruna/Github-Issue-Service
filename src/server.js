const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const bodyparser = require('body-parser')
const GithubWebHook = require('express-github-webhook')
var github = GithubWebHook({path: '/webhook', secret: process.env.GITHUB_TOKEN})
const app = express()
const port = 3000
let http = app.listen(port)
const io = require('socket.io')(http)
const handlebars = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.resolve(__dirname, 'views/layouts'),
  partialsDir: path.resolve(__dirname, 'views/partials')
})
app.use(bodyparser.json())
app.use(github)
app.use(express.static(path.resolve(__dirname, 'public')))
app.set('views', path.resolve(__dirname, 'views'))
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
io.on('connection', (socket) => {
  console.log('user ' + socket.id + ' has connected from ')
  socket.on('disconnect', () => {
    console.log('user ' + socket.id + ' disconnected!')
  })
})
/* on webhook event, use socket.io to send data to clients */
github.on('*', function (event, repo, data) {
  io.emit('issue',data)
});
app.use('/', require(path.resolve(__dirname, 'controllers/controller.js')))
app.get('/error', (req, res) => {
  process.exit(1)
})
