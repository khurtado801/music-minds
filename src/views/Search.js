import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import SearchList from '../components/SearchList';
import '../styles/index.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioDbAlbumsLimit: 5,
            lastFmAlbumsLimit: 5,
            lastFmTracksLimit: 5,
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
    
    /**
     * GET request to lastFM API:
     * Query by artist name returns artist bio and artist image
     */
    getBioLastFm = (e) => {
        let { userInput } = this.state; // Destruct state
        e.preventDefault(); // Prevent refresh

        axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=5d6a4c2be0bcb377567ac2c3edd9f472&artist=${userInput}&format=json`)
            .then((res) => {
                this.setState({
                    bioResults: res.data.artist.bio.content, // Set string state to artist bio from response
                    lastFmArtistImg: res.data.artist.image[4]['#text'] // Set state to artist image from response
                });
                this.getAlbumsAudioDb();
                this.clearInputs(); // clear input fields
            })
            .catch((err) => console.error(err));

        /**
        * GET request to theaudioDB API:
        * Query by artist name returns artist's album names
        */


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
    }

    /**
     * Method to clear user input from input field
     */
    clearInputs = () => {
        this.setState({ // Set state on this instance
            userInput: '' // of variable to empty string
        });
    };

    clearPage = () => {
        this.setState({ // Set state on this instance
            userInput: '', // of variable to empty string
            bioResults: '',
            lastFmArtistImg: '',
            audioDbAlbums: [],
            lastFmAlbums: [],
            lastFmTracks: [],
            lastFmArtist: [],
        });
    }

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
                audioDbAlbumsLimit: 5, lastFmAlbumsLimit: 5, lastFmTracksLimit: 5, audioDbAlbums: [], lastFmAlbums: [], lastFmTracks: [], lastFmArtist: [], userInput: value
            };
        });
    };

    render() {
        console.log('this.state!!', this.state)
        let {
            userInput, bioResults, lastFmArtistImg, audioDbAlbums, lastFmAlbums, lastFmTracks, audioDbAlbumsLimit, lastFmAlbumsLimit, lastFmTracksLimit
        } = this.state; // Destruct state
        console.log('lastFmAlbums', lastFmAlbums)
        return (
            <div>
                <Form inline onSubmit={this.getBioLastFm}>
                    <FormGroup>
                        <ControlLabel><h3>Search by artist name or track name</h3></ControlLabel>
                        {' '}
                        <FormControl 
                            type="text"
                            placeholder="Search here"
                            name="artist"
                            onChange={this.handleChange}
                            value={userInput}
                        />
                    </FormGroup>
                    {' '}
                    <Button variant="outlined" color="primary" type="submit">Submit</Button>
                    <Button onClick={this.clearPage} variant="outlined" color="secondary" type="submit">Clear Screen</Button>
                </Form>

                <div>
                    <div className="bio-wrapper">
                        <img className="bio-img" src={lastFmArtistImg} alt="" /> {/* Render artist image from API GET request */}
                        <h4 className="bio-txt">{bioResults}</h4> {/* Render artist bio from API GET request */}
                    </div>
                    <div>
                        { /* Response from LastFM GET request: Map through each album object one at a time and then return results to SearchList  */}
                        {lastFmAlbums.slice(0, lastFmAlbumsLimit).map((lastFmAlbum, i) => {
                            return <SearchList key={i} {...lastFmAlbum}></SearchList>;
                        })}
                    </div>
                    <div>
                        {
                            this.state.lastFmAlbums.length > 0 ?
                                    <h4 className="more-albums-button" onClick={() => this.setState({ lastFmAlbumsLimit: this.state.lastFmAlbumsLimit + 5 })}>Click here to load 5 more albums...</h4>
                            :
                                <div></div>
                        }
                    </div>
                    <div>
                        { /* Response from LastFM GET request: Map through each track object one at a time and then return results to SearchList  */}
                        {lastFmTracks.slice(0, lastFmTracksLimit).map((lastFmTrack, i) => {
                            return <SearchList key={i} {...lastFmTrack} lastFmAlbumsLimit={lastFmAlbumsLimit} lastFmTracksLimit={lastFmTracksLimit}></SearchList>;
                        })}
                    </div>
                    <div>
                        {
                            this.state.lastFmTracks.length > 0 ?
                                <h4 className="more-tracks-button" onClick={() => this.setState({ lastFmTracksLimit: this.state.lastFmTracksLimit + 5 })}>Click here to load 5 more tracks...</h4>
                            :
                                <div></div>
                        }
                    </div>
                </div>
            </div>
        );
    }
};

export default Search;