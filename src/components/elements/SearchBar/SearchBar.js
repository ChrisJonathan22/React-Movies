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
        let { timeout } = this.state
        this.setState({ value: event.target.value });
        clearTimeout(this.state.timeout);

        timeout = setTimeout(() => {
            this.props.callback(this.state.value);
        }, 500);
    }
    
    render() {
        return (
            <div className='rmdb-searchbar'>
                <div className='rmdb-searchbar-content'>
                    <FontAwesome className='rmdb-fa-search' name='search' size='2x' />
                    <input
                        type='text'
                        className='rmdb-searchbar-input'
                        placeholder='Search movies...'
                        onChange={this.search}
                        value={this.state.value} 
                    />
                </div> 
            </div>
        );
    }
}
