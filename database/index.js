const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: {type: Number},
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


let findTop = (callback) => {
	// Repo.find({}, (err, repos) => {
	// 	if (err) {
	// 		callback(err)
	// 	} else {
	// 		callback(repos)
	// 	}
	// }).sort({forks: "desc"}).limit(25)

	Repo.
		find().
		limit(25).
		sort('-forks').
		exec(callback);

}



module.exports.save = save;

module.exports.findTop = findTop;

