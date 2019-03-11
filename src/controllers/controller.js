const express = require('express')
const github = require('octonode')
var router = express.Router()


class Controller {
  constructor () {
    var client = github.client(process.env.GITHUB_API_TOKEN)
    var ghrepo = client.repo('1dv523/mm223fj-examination-3')
    router.get('/',   async function (req, res) {
      /* fetch issues and render the data using handlebars*/
      var issues =  await ghrepo.issues(function(err, data, headers) {
        res.render('issues', {issues: data})
      })
    })
}
}

module.exports = new Controller()
module.exports = router
