import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  search (term) {
    console.log(`${term} was searched`);
     $.ajax({
      method: "POST",
      url: "/repos",
      contentType: "application/json",
      data: JSON.stringify({
        "username": term
      }),
      success: (data) => {
        // console.log(data)
        $.ajax({
          method: "GET",
          url: "/repos",
          contentType: "application/json",
          success: (data) => {
            // console.log(data)
            this.setState({
              repos: data
            })
            console.log('hi', this.state.repos)
          },
          error: (error) => {console.log('error', error)}
        });  
      },
      error: (error) => {console.log()}
    });
    // TODO
  }

  render () {
    return (<div>
      <h1  className="title">Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));