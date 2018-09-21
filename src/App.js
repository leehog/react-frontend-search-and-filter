//@flow
import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';
import { Paginate, evalPageCount } from './Pagination';

import logo from './assets/logo.png'
import search from './assets/search.png'
import downArrow from './assets/arrowdown.png'
import { ENGINE_METHOD_ALL } from 'constants';


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
  gameList: Array<Game>,
  filter: {
    searchValue: string,
    genre: string,
    type: string
  },
  currentPaginate: number,
  genreActive: boolean,
  typeActive: boolean

}

class App extends Component<null, State> {
  constructor() {
    super()
    this.state = {
      gameList: [],
      filter: {
        searchValue: "",
        genre: "All",
        type: "All"
      },
      currentPaginate: 1,
      genreActive: false,
      typeActive: false
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = () => {
    const data = axios.get('http://localhost:3000/data.php')
    .then(response => {
      this.setState({ gameList: response.data.games })
    })
    .catch ((error) => {
      console.log(error)
    })
  }

  filteredSearch(array: Array<Game>, value: string): Array<Game> {
    let newArray = []
    array.forEach((item) => {
      if(item.title.toLowerCase().indexOf(value) !== -1)
        newArray = [...newArray, item]
    })
    return newArray
  }

  filterArrayOfObjectsByValue(array: Array<string>, value: string) {
    let valueFound = false
    array.forEach((item) => {
      if(item == value) {
        valueFound = true
      }
    })
    return valueFound
  }

  filterByGenre = (array: Array<Game>, genre: string) => {
    let newArray = [...array]
    if(genre !== "All") {
      newArray = []
      array.forEach((game) => {
        if(this.filterArrayOfObjectsByValue(game.genre, genre)) {
            newArray = [...newArray, game]
        }
      })
    }
    return newArray
  }

  filterByType = (array: Array<Game>, type: string) => {
    let newArray = [...array]
    if(type !== "All") {
      newArray = []
      array.forEach((game) => {
        if(this.filterArrayOfObjectsByValue(game.type, type)) {
            newArray = [...newArray, game]
        }
      })
    }

    return newArray
  }

  PaginateButton = (page: number) => {
    return(
      <div>
         <li className="page-item pagination-btn"><a className="page-link" onClick={() => this.handlePageChange(page)}>{page}</a></li>
      </div>
    )
  }

  genreListButton = (val: string) => {
    return(
    <li 
       onClick={() => this.handleGenreChange(val)}
       className={this.state.filter.genre === val ? 'active-link' : ''}>
       {val}
    </li>
    )
  }

  typeListButton = (val: string) => {
    return(
    <li 
        onClick={() => this.handleTypeChange(val)}
        className={this.state.filter.type === val ? 'active-link' : ''}>
        {val}
    </li>    
  )
  }

  handleSearch = (val: string) => {
    this.setState({ filter: { ...this.state.filter, searchValue: val }, currentPaginate: 1 })
  }

  handleGenreChange = (val: string) => {
    this.setState({ filter: { ...this.state.filter, genre: val }, currentPaginate: 1  }, () => console.log(this.state))
  }

  handleTypeChange = (val: string) => {
    this.setState({ filter: { ...this.state.filter, type: val }, currentPaginate: 1  })
  }
  handlePageChange = (page: number) => {
    this.setState({ currentPaginate: page })
  }  

  render() {
    const { filteredSearch, filterByGenre, filterByType } = this
    const { gameList, currentPaginate } = this.state
    const filteredgameList = filterByType(filterByGenre(filteredSearch(this.state.gameList, this.state.filter.searchValue), this.state.filter.genre), this.state.filter.type)
    const currentItems = Paginate({items: filteredgameList, currentPage: currentPaginate})
    const pageCount = evalPageCount(filteredgameList)

    const genreList = ["All", "Top Games", "Action", "Adventure", "Drama", "Indie", "Mystery", "RPG", "Simulation", "Sports"]
    const typeList = ["All", "Offer", "Free"]

    return (
      <div className="App">
        <div className="header row">
           <div className="col-md-4 col-sm-12 col-12 header-col left">
           <img src={logo} alt="company-logo" className="header-logo"/>
           <div className="mobile-login"><h3>Login</h3></div>
           </div>
           <div className="header-link-container col-md-4 col-sm-12 col-12 header-col center">
              <ul className="header-link-wrap">
                <li className="link-active">Lorem <div className="underline"></div></li>
                <li>Ipsum</li>
                <li>Dolor</li>
              </ul>
           </div>
           <div className="login-btn col-md-4 col-sm-6 col-6 header-col right">
             <h3>Login</h3>
           </div>
        </div>
          <div className="row no-margin container-fluid">  
          <div className="col-md-2">
        <div className={this.state.genreActive ? 'open': 'closed'}>
          <button 
              className="dropdown filter-type"
              onClick={() => this.setState({ genreActive: !this.state.genreActive })}>
              Genres<img src={downArrow} alt="down-arrow" className="down-arrow"/>
          </button>
          <ul className="filters">
              {genreList.map((genre) => this.genreListButton(genre))}
          </ul>
        </div>
        <div className={this.state.typeActive ? 'open': 'closed'}>
          <button 
              className="dropdown filter-type"
              onClick={() => this.setState({ typeActive: !this.state.typeActive })}>
              Type<img src={downArrow} alt="down-arrow" className="down-arrow"/>
          </button>
          <ul className="filters">
             {typeList.map((type) => this.typeListButton(type))}       
         </ul>
        </div>
        </div>
        <div className="col-md-10">
        <div className="search-wrap">
        <img 
          src={search} 
          alt="search-logo" 
          className="search-logo"
        />
        <input 
              placeholder="Search for your favorite game"
              onChange={(e) => this.handleSearch(e.currentTarget.value)}
              value={this.state.filter.searchValue} 
              className="form-control searchbar"
          />
        </div>  
          {currentItems.length > 0 ? currentItems.map((item) => <GameCard key={uuid()} game={item} />) : <h1 className="no-content">No games in your category/search..</h1>}
        </div>
        </div>
        <nav aria-label="pagination-wrap">
           <ul class="pagination">
              {pageCount.map((page) => this.PaginateButton(page))}
         </ul>
        </nav>
      </div>
    )
  }
}

export default App
