const express = require('express');
let bodyParser = require('body-parser');
let app = express();
let db = require('../database/index.js');
let github = require('../helpers/github.js');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
	// console.log(req.body);
	github.getReposByUsername(req.body.username, (err, results) => {
		if (err) {
			console.log(err);
		} else {
			var repoArray = results.forEach(repo => {
				 var r = {
					"id": repo.id,
					"owner_login": repo.owner.login,
				  "name": repo.name,
				  "html_url": repo.html_url,
				  "description": repo.description,
				  "forks": repo.forks
				};
				console.log(r);
				db.save(r);
			})
			// console.log(repoArray)
			res.status(201).end();
		}
	})
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.findTop((err, repos) => {
  	if (err) {
  		res.status(500).send(err);
  	} else {
  		res.send(repos)
  		// console.log(repos)
  	}
  })
});

app.get('/reset', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.reset(() => {
  	res.end('Reset!');
  })
});


let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

