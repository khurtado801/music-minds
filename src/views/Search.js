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
                    item.type = 'album'; // add property named type and set value to album
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
                    item.type = 'album'; // add property named type and set value to album
                });
                this.setState({
                    lastFmAlbums: lastFmAlbumsRes // Set array state to array of album objects from response
                });
                this.clearInputs(); // clear input fields
            })
            .catch((err) => console.error('Err2: ', err));

        
        /**
         * GET request to LastFM API:
         * Query by track name returns artist name and album name
         */
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${userInput}&limit=10&api_key=5d6a4c2be0bcb377567ac2c3edd9f472&format=json`)
            .then((res) => {
                let lastFmTracksRes = res.data.results.trackmatches.track; // Declare variable and set to response of array of track objects
                this.data = res.data.results.trackmatches.track; // Set this instance of data to array of track objects from response
                this.data.forEach((item) => { // For each track object item
                    item.type = 'track'; // add property named type and set value to track
                });
                this.setState({
                    lastFmTracks: lastFmTracksRes // Set array state to array of track objects from response
                });
                this.clearInputs(); // clear input fields
            })
            .catch((err) => console.error('Err5: ', err));

        /**
         * GET request to SongKick
         * Query by artist name returns artist ID
         * which will be needed to search for artist's upcoming event
         */
        axios.get(`https://api.songkick.com/api/3.0/search/artists.json?apikey=EasSil2s2rpezUZr&query=${userInput}&page=1`)
            .then((res) => {
                console.log('SongKick Artist ID :', res.data.resultsPage.results.artist[0].id);
                console.log('SongKick On Tour Status :', res.data.resultsPage.results.artist[0].onTourUntil);
            })
            .catch((err) => console.error('Err3: ', err));
    };

    /**
     * Method to clear user input from input field
     */
    clearInputs = () => {
        this.setState({ // Set state on this instance
            userInput: '' // of variable to empty string
        });
    };

    /**
     * Method to clear previous state of userInput
     * and set to current target of the value of
     * userInput
     */
    handleChange = (e) => {
        let { value } = e.target; // Set variable to current value of event target
        this.setState(() => {
            /**
             * Clear previous state of arrays, then state of userInput to current value, return value of userInput for GET request
             */
            return {
                audioDbAlbums: [], lastFmAlbums: [], lastFmTracks: [], lastFmArtist: [], userInput: value
            };
        });
    };

    render() {
        let {
            userInput, bioResults, lastFmArtistImg, audioDbAlbums, lastFmAlbums, lastFmTracks
        } = this.state; // Destruct state
        return (
            <div className="component-wrapper">
                <h2>Start Your Search For Some Tasty Tunes</h2>
                {/* Form for submitting query */}
                {/* On form submit call getRequest method to initiate GET requests to APIs */}
                <form onSubmit={this.getRequest}>
                    <fieldset>
                        <label>
                            {/* On change of form input call handleChange method to set the current state of the event target value userInput */}
                            <input onChange={this.handleChange} value={userInput} name="artist" type="text" />
                            <button type="submit">Search</button>
                        </label>
                    </fieldset>
                </form>
                <div>
                    <img className="bio-img" src={lastFmArtistImg} alt="" /> {/* Render artist image from API GET request */}
                    <p className="bio-txt">{bioResults}</p> {/* Render artist bio from API GET request */}
                    <div>
                        {/* Response from theaudiodb GET request: Map through each album object one at a time and then return results to SearchList  */}
                        {audioDbAlbums.map((audioDbAlbum, i) => {
                            return <SearchList key={i} {...audioDbAlbum}></SearchList>;
                        })}
                    </div>
                    <div>
                    { /* Response from LastFM GET request: Map through each album object one at a time and then return results to SearchList  */}
                        {lastFmAlbums.map((lastFmAlbum, i) => {
                            return <SearchList key={i} {...lastFmAlbum}></SearchList>;
                        })}
                    </div>
                    <div>
                    { /* Response from LastFM GET request: Map through each track object one at a time and then return results to SearchList  */}
                        {lastFmTracks.map((lastFmTrack, i) => {
                            return <SearchList key={i} {...lastFmTrack}></SearchList>;
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;
