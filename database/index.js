const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: {type: Number, unique: true},
  owner_login: String,
  name: String,
  html_url: String,
  description: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = ({id, owner_login, name, html_url, description, forks}) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var repo = new Repo({
  	id: id,
	  owner_login: owner_login,
	  name: name,
	  html_url: html_url,
	  description: description,
	  forks: forks
  })

  repo.save((err, repo) => {
  	if (err) {
  		console.log(err)
  	}
  });
}

//Josh refactor
let newsave = (r) => {

  var repo = new Repo(r)
  
  repo.save((err, repo) => {
  	if (err) {
  		console.log(err)
  	}
  });
}


let findTop = (callback) => {
	// Repo.find({}, (err, repos) => {
	// 	if (err) {
	// 		callback(err)
	// 	} else {
	// 		callback(repos)
	// 	}
	// }).sort({forks: "desc"}).limit(25)

	Repo.find({}, null, {
		sort: {forks: +1},
		limit: 25
	}, callback)

	// Repo.
	// 	find().
	// 	sort('+forks').
	// 	limit(25).
	// 	exec(callback);
}


let reset = (callback) => {

	Repo.deleteMany({}, callback)
}



module.exports.save = save;

module.exports.findTop = findTop;

module.exports.reset = reset;


