import React from 'react';
// import $ from 'jquery';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.search = this.search.bind(this)
  }

  handleChange (e) {
    this.setState({
      term: e.target.value
    });
    // console.log(this.state.term)
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (
      <div className="search">
        <h4>Add more repos!</h4>
        Enter a github username: <input value={this.state.term} onChange={this.handleChange}/>       
        <button onClick={this.search}> Add Repos </button>
      </div>
    ) 
  }
}

export default Search;