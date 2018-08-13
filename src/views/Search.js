import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import SearchList from '../components/SearchList';
import Greetings from '../components/Greetings';
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
            lastFmAlbumImg: '',
            lastFmTrackImg: '',
            audioDbAlbums: [],
            lastFmAlbums: [],
            lastFmTracks: [],
            lastFmArtist: [],
            type: '',
            usrAmntRtn: ''
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
            userInput: '', // of variable to empty string
            usrAmntRtn: ''
        });
    };

    clearPage = () => {
        /**
         * Set state on this instance of
         * variables to an empty strin
         */
        this.setState({
            userInput: '',
            usrAmntRtn: '',
            bioResults: '',
            lastFmArtistImg: '',
            lastFmAlbumImg: '',
            lastFmTrackImg: '',
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
    handleTextChange = (e) => {
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

    handleNumRtnChange = (e) => {
        let { value } = e.target; // Destructure event target value into value variable
        this.setState(() => {
            /**
             * Clear previous state of arrays, then state of userInput to current value, return value of userInput for GET request
             */
            return {
                audioDbAlbumsLimit: value, lastFmAlbumsLimit: value, lastFmTracksLimit: value,
            }
        })
    }

    render() {
        let {
            userInput, bioResults, lastFmArtistImg, lastFmAlbums, lastFmTracks, lastFmAlbumsLimit, lastFmTracksLimit
        } = this.state; // Destruct state
        return (
            <div>
            <Greetings />
                <Form inline onSubmit={this.getBioLastFm}>
                    <FormGroup>
                        <ControlLabel><h3>Search by artist name or track name: </h3></ControlLabel>
                        {' '}
                        <FormControl 
                            type="text"
                            placeholder="Enter search term(s)"
                            name="artist"
                            onChange={this.handleTextChange}
                            value={userInput}
                        />
                    </FormGroup>
                    {' '}
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel><h3>Amount to return: </h3></ControlLabel>
                        {' '}
                        <FormControl
                            componentClass="select"
                            onChange={this.handleNumRtnChange}
                            placeholder="select">
                                <option value="select">select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                        </FormControl>
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
                    {
                        this.state.bioResults.length > 0 ?
                            <div className="results-wrapper">
                                <h3>Here are your results</h3>
                            </div>
                        :
                            <div></div>

                    }
                    <div className="lastfm-albums flex-container wrap">
                        { /* Response from LastFM GET request: Map through each album object one at a time and then return results to SearchList  */}
                        {lastFmAlbums.slice(0, lastFmAlbumsLimit).map((lastFmAlbum, i) => {
                            return <SearchList key={i} {...lastFmAlbum}></SearchList>;
                        })}
                    </div>
                    <div>
                        {
                            this.state.lastFmAlbums.length > 0 ?
                                <Button className="more-albums-button" variant="outlined" color="primary" onClick={() => this.setState({ lastFmAlbumsLimit: this.state.lastFmAlbumsLimit + this.state.lastFmAlbumsLimit })}><h4>Load more results...</h4></Button>
                            :
                                <div></div>
                        }
                    </div>
                    <div className="lastfm-tracks flex-container wrap">
                        { /* Response from LastFM GET request: Map through each track object one at a time and then return results to SearchList  */}
                        {lastFmTracks.slice(0, lastFmTracksLimit).map((lastFmTrack, i) => {
                            return <SearchList key={i} {...lastFmTrack} lastFmAlbumsLimit={lastFmAlbumsLimit} lastFmTracksLimit={lastFmTracksLimit}></SearchList>;
                        })}
                    </div>
                    <div>
                        {
                            this.state.lastFmTracks.length > 0 ?
                                <Button className="more-albums-button" variant="outlined" color="primary" onClick={() => this.setState({ lastFmTracksLimit: this.state.lastFmTracksLimit + this.state.lastFmTracksLimit })}><h4>Load more results...</h4></Button>
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