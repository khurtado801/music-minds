import React from 'react';

function SearchList(props) {
    let { strAlbum, name, artist, type } = props;
    console.log('props', props);
    if (type === 'album') {
        return (
            <div>
                <p>Album Name: {strAlbum ? strAlbum : name}</p>
            </div>
        );
    }
    if (type === 'track') {
        return (
            <div>
                <p>Track Name: {name}</p>
                <p>Artist Name: {artist}</p>
            </div>
        );
    }
}

export default SearchList;
