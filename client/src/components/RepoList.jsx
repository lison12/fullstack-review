import React from 'react';

const RepoList = (props) => (
  <div className="repolist">
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <table className="table">
	    <thead className="labels">
	    	<tr>
			    <th className="label user"> Username </th>
			    <th className="label repo"> Repository Name </th>
			    <th className="label desc"> Description </th>
			    <th className="label forks"> Forks </th>
		    </tr>
	    </thead>
	    <tbody>
		    {props.repos.map((repo, i) => {
		    	return (
		    		<tr value={repo} key={i}>
		    			<td className="user"> {repo.owner_login} </td>
		    			<td><a className="url" href={repo.html_url}> {repo.name} </a></td>
		    			<td className="desc"> {repo.description} </td>
		    			<td className="forks"> {repo.forks} </td>
		    		</tr>
		    	)}
		    )}
	    </tbody>
    </table>
  </div>
)

export default RepoList;


	    // <span className="label url"> URL Link </span>
    	// 		<span className="repo"> {repo.name} </span>
	    // <span className="label id"> ID </span>
    	// 		<span className="id"> {repo.id} </span>