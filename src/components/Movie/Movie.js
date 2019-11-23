import React, { Component } from 'react';
import { API_URL, API_KEY } from '../../config';
import axios from 'axios';
import Navigation from '../elements/Navigation/Navigation';
import MovieInfo from '../elements/MovieInfo/MovieInfo';
import MovieInfoBar from '../elements/MovieInfoBar/MovieInfoBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import Actor from '../elements/Actor/Actor';
import Spinner from '../elements/Spinner/Spinner';
import './Movie.scss';


export default class Movie extends Component {
    constructor(props) {
        super(props)
        this.state = {
             movie: null,
             actors: null,
             directors: [],
             loading: false
        }

        this.fetchItems = this.fetchItems.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });
        // First fetch the movie...
        // This expression "this.props.match.params.movieId" allows for parameter from the URL to be accessible
        const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`;
        this.fetchItems(endpoint);
    }

    async fetchItems (endpoint) {
        let result = await axios.get(endpoint);

        if (result.status_code) {
            this.setState({ loading: false });
        } else {
            this.setState({ 
                movie: result.data
            }, async () => {
                // Then fetch actors in the setstate callback function.
                const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`;
                let result = await axios.get(endpoint);
                const directors = await result.data.crew.filter((member) => {
                    if (member.job === 'Director') {
                        return member;
                    }
                });
                this.setState({ 
                    actors: result.data.cast,
                    directors,
                    loading: false
                }, () => {
                    console.log('Actors', this.state.actors);
                });
            });
        }
    }
    
    render() {
        return (
            <div className='rmdb-movie'>
                <Navigation />
                {/* <Movie /> */}
                <MovieInfo />
                <MovieInfoBar />
                {/* <FourColGrid /> */}
                <Spinner />
            </div>
        );
    }
}
