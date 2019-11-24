import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MovieThumb.scss';

const MovieThumb = (props) => {
    return (
        <div className='rmdb-moviethumb'>
            {props.clickable ? 
                // Add the movie id to the path and also send through the movie name.
                <Link to={{ pathname:`/${props.movieId}`, movieName: `${props.movieName}` }}>
                    <img src={props.image} alt='moviethumb' />
                </Link>
                :
                <img src={props.image} alt='moviethumb' />
            }
        </div>
    );
};

MovieThumb.propTypes = {
    image: PropTypes.string,
    movieId: PropTypes.number,
    movieName: PropTypes.string
}

export default MovieThumb;