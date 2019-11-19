import React, { Component } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../config';
import axios from 'axios';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';
import './Home.scss';

export default class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            movies: [],
            heroImage: null,
            loading: false,
            currentPage: 0,
            totalPages: 0,
            searchTerm: ''
        }

        this.fetchItems = this.fetchItems.bind(this);
        this.loadMoreItems = this.loadMoreItems.bind(this);
    }

    async fetchItems (url) {
        let result = await axios.get(url);
        // The code below allows us to copy any previous movies and append new movies.
        this.setState({
            movies: [...this.state.movies, ...result.data.results],
            heroImage: this.state.heroImage ? this.state.heroImage : result.data.results[0],
            loading: false,
            currentPage: result.data.page,
            totalPages: this.state.totalPages ? this.state.totalPages : result.data.total_pages
        });
        console.log(result);
    }

    async loadMoreItems () {
        
    }

    componentDidMount() {
        this.setState({ loading: true });
        const ENDPOINT = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        this.fetchItems(ENDPOINT);
    }
    
    render() {
        return (
            <div className='rmdb-home'>
              <HeroImage />
              <SearchBar />
              <FourColGrid />
              <Spinner />
              <LoadMoreBtn />  
            </div>
        );
    }
}
