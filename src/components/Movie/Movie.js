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
        if (localStorage.getItem(`${this.props.match.params.movieId}`)) {
            const state = JSON.parse(localStorage.getItem(`${this.props.match.params.movieId}`));
            this.setState({ ...state });
        } else {
            this.setState({ loading: true });
            // First fetch the movie...
            // This expression "this.props.match.params.movieId" allows for parameter from the URL to be accessible
            const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`;
            this.fetchItems(endpoint);
        }
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
                    localStorage.setItem(`${this.props.match.params.movieId}`, JSON.stringify(this.state));
                });
            });
        }
    }
    
    render() {
        let { loading, movie, directors, actors } = this.state;
        return (
            <div className='rmdb-movie'>
                { movie ?
                    <div>
                        <Navigation movie={this.props.location.movieName} />
                        <MovieInfo movie={movie} directors={directors} />
                        <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue} />
                    </div>
                    :
                    null
                }
                { actors ?
                    <div className='rmdb-movie-grid'>
                        <FourColGrid header={'Actors'}>
                            { actors.map((element, i) => {
                                    return <Actor key={i} actor={element} />;
                                })
                            }
                        </FourColGrid>
                    </div>
                    :
                    null
                }
                { !actors && !loading ? <h1>No Movie Found!</h1> : null }
                {loading ? <Spinner />
                    :
                    null
                }
            </div>
        );
    }
}
