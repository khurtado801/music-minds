import React, { Component } from 'react';
import axios from 'axios';
import SearchList from '../components/SearchList';
import './index.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bioResults: '',
            userInput: '',
            lastFmArtistImg: '',
            audioDbAlbums: [],
            lastFmAlbums: [],
            lastFmTracks: [],
            lastFmArtist: [],
            type: ''
        };
    }

    getRequest = (e) => {
        let { userInput } = this.state; // Destruct state
        e.preventDefault(); // Prevent refresh

        /**
         * GET request to lastFM API:
         * Query by artist name returns artist bio and artist image
         */
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=5d6a4c2be0bcb377567ac2c3edd9f472&artist=${userInput}&format=json`)
            .then((res) => {
                this.setState({
                    bioResults: res.data.artist.bio.content, // Set string state to artist bio from response
                    lastFmArtistImg: res.data.artist.image[4]['#text'] // Set state to artist image from response
                });
                this.clearInputs(); // clear input fields
            })
            .catch((err) => console.error(err));

        /**
         * GET request to theaudioDB API:
         * Query by artist name returns artist's album names
         */
        axios.get(`http://www.theaudiodb.com/api/v1/json/195003/searchalbum.php?s=${userInput}`)
            .then((res) => {
                let audioDbAlbumsRes = res.data.album; // Declare variable and set to response of array of album objects
                this.data = res.data.album;
                this.data.forEach((item) => { // For each album object item
                    item.type = 'album';      // add property named type and set value to album
                });
                this.setState({
                    audioDbAlbums: audioDbAlbumsRes // Set array state to array of album objects from response
                });
                this.clearInputs(); // clear input fields
            })
            .catch((err) => console.error('Err1: ', err));

        /**
         * GET request to lastFM API:
         * Query by artist name returns artist's album names
         */
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${userInput}&api_key=5d6a4c2be0bcb377567ac2c3edd9f472&format=json`)
            .then((res) => {
                let lastFmAlbumsRes = res.data.topalbums.album; // Declare variable and set to response of array of album objects
                this.data = res.data.topalbums.album; // Set this instance of data to array of album objects from response
                this.data.forEach((item) => { // For each album object item
                    item.type = 'album';      // add property named type and set value to album
                });
                this.setState({
                    lastFmAlbums: lastFmAlbumsRes // Set array state to array of album objects from response
                });
                this.clearInputs(); // clear input fields
            })
            .catch((err) => console.error('Err2: ', err));

        // Search results from query by album name, returns album name and album image
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${userInput}&api_key=5d6a4c2be0bcb377567ac2c3edd9f472&format=json`)
            .then((res) => {
                this.data = res.data.albummatches.album; // Set this instance of data to array of album objects from response
                this.data.forEach((item) => { // For each album object item
                    item.type = 'album';      // add property named type and set value to album
                });
                this.clearInputs(); // clear input fields
            })
            .catch((err) => console.error('Err3: ', err));
        
        /**
         * GET request to LastFM API:
         * Query by track name returns artist name
         */
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${userInput}&limit=10&api_key=5d6a4c2be0bcb377567ac2c3edd9f472&format=json`)
            .then((res) => {
                let lastFmTracksRes = res.data.results.trackmatches.track;
                this.data = res.data.results.trackmatches.track;
                this.data.forEach((item) => {
                    item.type = 'track';
                });
                this.setState({
                    lastFmTracks: lastFmTracksRes
                });
                this.clearInputs(); // clear input fields
            })
            .catch((err) => console.error('Err5: ', err));
    };

    clearInputs = () => {
        this.setState({
            userInput: ''
        });
    };

    handleChange = (e) => {
        let { value } = e.target;
        this.setState((prevState) => {
            return { userInput: value };
        });
    };

    render() {
        let { userInput, bioResults, lastFmArtistImg, audioDbAlbums, lastFmAlbums, lastFmTracks } = this.state;
        return (
            <div className="component-wrapper">
                <h2>Start Your Search For Some Tasty Tunes</h2>
                <form onSubmit={this.getRequest}>
                    <fieldset>
                        <label>
                            <input onChange={this.handleChange} value={userInput} name="artist" type="text" />
                            <button type="submit">Search</button>
                        </label>
                    </fieldset>
                </form>
                <div>
                    <img src={lastFmArtistImg} alt="" />
                    <p>{bioResults}</p>
                    <div>
                        {audioDbAlbums.map((audioDbAlbum, i) => {
                            return <SearchList key={i} {...audioDbAlbum}></SearchList>;
                        })}
                    </div>
                    <div>
                        {lastFmAlbums.map((lastFmAlbum, i) => {
                            return <SearchList key={i} {...lastFmAlbum}></SearchList>;
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;
