import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './SearchBar.scss';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
             value: '',
             timeout: null
        }

        this.search = this.search.bind(this);
    }

    search (event) {
        let { timeout, value } = this.state
        this.setState({ value: event.target.value });
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            this.props.callback(value);
        }, 500);
    }
    
    render() {
        let { search, value } = this.state;
        return (
            <div className='rmdb-searchbar'>
                <div className='rmdb-searchbar-content'>
                    <FontAwesome className='rmdb-fa-search' name='search' size='2x' />
                    <input
                        type='text'
                        className='rmdb-searchbar-input'
                        placeholder='Search movies...'
                        onChange={this.search}
                        value={value} 
                    />
                </div> 
            </div>
        );
    }
}
