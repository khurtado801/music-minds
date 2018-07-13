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
        let { userInput } = this.state;
        e.preventDefault();
        // Search results from query by artist name, bio and artist image returned
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=5d6a4c2be0bcb377567ac2c3edd9f472&artist=${userInput}&format=json`)
            .then((response) => {
                this.setState({
                    bioResults: response.data.artist.bio.content,
                    lastFmArtistImg: response.data.artist.image[4]['#text']
                });
                this.clearInputs();
            })
            .catch((err) => console.error(err));

        // AudioDB search results from query by artist name, album name and album image returned
        axios.get(`http://www.theaudiodb.com/api/v1/json/195003/searchalbum.php?s=${userInput}`)
            .then((res) => {
                let audioDbAlbumsRes = res.data.album;
                this.data = res.data.album;
                this.data.forEach((item) => {
                    // console.log('Found: Item1', item);
                    item.type = 'album';
                    console.log('Found Album1: ', item.strAlbum);
                    // console.log('Found Thumb1: ', item.strAlbumThumb);
                });
                // this.data.map((Album1, index) => {
                //     console.log('Search1 Albums: ', Album1.strAlbum);
                // });
                this.setState({
                    audioDbAlbums: audioDbAlbumsRes,
                });
                this.clearInputs();
            })
            .catch((err) => console.error('Err1: ', err));

        // LastFM search results from query by artist name, album name returned
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${userInput}&api_key=5d6a4c2be0bcb377567ac2c3edd9f472&format=json`)
            .then((res) => {
                let lastFmAlbumsRes = res.data.topalbums.album;
                this.data = res.data.topalbums.album;
                this.data.forEach((item) => {
                    item.type = 'album';
                    console.log('Found Item2: ', item);
                    console.log('Found Image2: ', item.image[3]['#text']);
                    console.log('Found Album2: ', item.name);
                });
                // this.data.map((Album2, index) => {
                //     console.log('Search2 Albums: ', Album2.name);
                // });
                this.setState({
                    lastFmAlbums: lastFmAlbumsRes
                });
                this.clearInputs();
            })
            .catch((err) => console.error('Err2: ', err));

        // Search results from query by album name, returns album name and album image
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${userInput}&api_key=5d6a4c2be0bcb377567ac2c3edd9f472&format=json`)
            .then((res) => {
                this.data = res.data.albummatches.album;
                this.data.forEach((item) => {
                    item.type = 'album';
                    console.log('Found Item3: ', item);
                    console.log('Found Image3: ', item.image[3]['#text']);
                    console.log('Found Album3: ', item.name);
                });
                this.clearInputs();
            })
            .catch((err) => console.error('Err3: ', err));
        
        // Search results by artist/track name, returns artist/track name
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${userInput}&limit=10&api_key=5d6a4c2be0bcb377567ac2c3edd9f472&format=json`)
            .then((res) => {
                let lastFmTracksRes = res.data.results.trackmatches.track;
                this.data = res.data.results.trackmatches.track;
                this.data.forEach((item) => {
                    item.type = 'track';
                    console.log('Found Item5: ', item);
                    console.log('Found Item5 Track: ', item.track);
                    console.log('Found Item5 Artist: ', item.artist);
                });
                this.data.map((track, index) => {
                    console.log('Search5 Tracks: ', track.name);
                    console.log('Search5 Track URL: ', track.url);
                });
                this.setState({
                    lastFmTracks: lastFmTracksRes
                });
                this.clearInputs();
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
