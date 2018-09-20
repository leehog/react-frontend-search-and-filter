//@flow
import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';

import './App.css';

type Game = {
  title: string,
  image: string,
  genre: Array<string>,
  type: Array<string>
}

const GameCard = (props: {game: Game}) => {
  const { image } = props.game;
  return(
      <img src={image} className="col-md-2 col-sm-3 col-4 game-img"/>
  )
}

type State = {
  gamelist: Array<Game>,
  filter: {
    searchValue: string,
    genre: string,
    type: string
  }
}

class App extends Component<null, State> {
  constructor() {
    super();
    this.state = {
      gamelist: [],
      filter: {
        searchValue: "",
        genre: "All",
        type: "All"
      }
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const data = axios.get('http://localhost:3000/data.php')
    .then(response => {
      this.setState({ gamelist: response.data.games });
    })
    .catch ((error) => {
      console.log(error)
    })
  }

  filteredSearch(array: Array<Game>, value: string): Array<Game> {
    let newArray = [];
    array.forEach((item) => {
      if(item.title.toLowerCase().indexOf(value) !== -1)
        newArray = [...newArray, item]
    })
    return newArray;
  }

  filterArrayOfObjectsByValue(array: Array<string>, value: string) {
    let valueFound = false;
    array.forEach((item) => {
      if(item == value) {
        valueFound = true;
      }
    })
    return valueFound
  }

  filterByGenre = (array: Array<Game>, genre: string) => {
    let newArray = [...array];
    if(genre !== "All") {
      newArray = [];
      array.forEach((game) => {
        if(this.filterArrayOfObjectsByValue(game.genre, genre)) {
            newArray = [...newArray, game]
        }
      })
    }
    return newArray;
  }

  filterByType = (array: Array<Game>, type: string) => {
    let newArray = [...array];
    if(type !== "All") {
      newArray = [];
      array.forEach((game) => {
        if(this.filterArrayOfObjectsByValue(game.type, type)) {
            newArray = [...newArray, game]
        }
      })
    }
    console.log(newArray)

    return newArray;
  }

  handleSearch = (val: string) => {
    this.setState({ filter: { ...this.state.filter, searchValue: val } })
  }

  handleGenreChange = (val: string) => {
    this.setState({ filter: { ...this.state.filter, genre: val } }, () => console.log(this.state))
  }

  handleTypeChange = (val: string) => {
    this.setState({ filter: { ...this.state.filter, type: val } })
  }

  render() {
    const { filteredSearch, filterByGenre, filterByType } = this;
    const { gamelist } = this.state;
    const filteredGameList = filterByType(filterByGenre(filteredSearch(this.state.gamelist, this.state.filter.searchValue), this.state.filter.genre), this.state.filter.type)
    console.log(filteredGameList)
    return (
      <div className="App">
        <div className="header"></div>
          <div className="row">  
          <div className="col-md-3">
        <div className="open">
          <button className="dropdown filter-type">Genres</button>
          <ul className="filters">
              <li onClick={() => this.handleGenreChange('All')}>All</li>
              <li onClick={() => this.handleGenreChange('Top Games')}>Top Games</li>
              <li onClick={() => this.handleGenreChange('Action')}>Action</li>
              <li onClick={() => this.handleGenreChange('Adventure')}>Adventure</li>
              <li onClick={() => this.handleGenreChange('Drama')}>Drama</li>
              <li onClick={() => this.handleGenreChange('Indie')}>Indie</li>
              <li onClick={() => this.handleGenreChange('Mystery')}>Mystery</li>
              <li onClick={() => this.handleGenreChange('RPG')}>RPG</li>
              <li onClick={() => this.handleGenreChange('Simulation')}>Simulation</li>
              <li onClick={() => this.handleGenreChange('Sports')}>Sports</li>
          </ul>
        </div>
        <div className="open">
          <button className="dropdown filter-type">Type</button>
          <ul className="filters">
            <li onClick={() => this.handleTypeChange('All')}>All</li>
            <li onClick={() => this.handleTypeChange('Offer')}>Offers</li>
            <li onClick={() => this.handleTypeChange('Free')}>Free</li>
          </ul>
        </div>
        </div>
        <div className="col-md-9">
        <input placeholder="Search for your favorite game" onChange={(e) => this.handleSearch(e.currentTarget.value)} value={this.state.filter.searchValue} className="form-control searchbar"/>
          {filteredGameList.length > 0 ? filteredGameList.map((item) => <GameCard key={uuid()} game={item} />) : <h1 className="no-content">No games matched your search..</h1>}
        </div>
        </div>
      </div>
    );
  }
}

export default App;
