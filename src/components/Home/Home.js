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
        this.searchItems = this.searchItems.bind(this);
    }


    componentDidMount() {
        this.setState({ loading: true });
        const ENDPOINT = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        this.fetchItems(ENDPOINT);
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

        loadMoreItems () {
        let endpoint = '';
        this.setState({ loading: true });

        let { searchTerm, currentPage } = this.state;

        if (searchTerm === '') {
            endpoint = `${API_URL}movie/popular/api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
        } else {
            endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${currentPage + 1}`;
        }

        this.fetchItems(endpoint);
    }

        searchItems (searchTerm) {
            console.log(searchTerm);
            let endpoint = '';
            this.setState({
                movies: [],
                loading: true,
                searchTerm
            });

            if (searchTerm === '') {
                endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
            } else {
                endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
            }

            this.fetchItems(endpoint);
        }


    
    
    render() {
        let { searchTerm, loading, movies, currentPage, totalPages } = this.state;
        return (
            <div className='rmdb-home'>
                {this.state.heroImage ?
                <div>
                    <HeroImage 
                        image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
                        title={this.state.heroImage.original_title}
                        text={this.state.heroImage.overview}
                    />
                    <SearchBar callback={this.searchItems} />
                </div> : null }
                <div className='rmdb-home-grid'>
                    <FourColGrid 
                        header={searchTerm ? 'Search Result' : 'Popular Movies'}
                        loading={loading}
                    >
                        {
                            movies.map((element, i) => {
                                return <MovieThumb 
                                            key={i}
                                            clickable={true}
                                            image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : './images/no_image.jpg'}
                                            movieId={element.id}
                                            movieName={element.original_title}
                                        />
                            })
                        }
                    </FourColGrid>
                    { loading ? <Spinner/> : null }
                    { (currentPage <= totalPages && !loading) ? 
                        <LoadMoreBtn text='Load More' onClick={this.loadMoreItems} />
                        :
                        null 
                    }
                </div>
            </div>
        );
    }
}
