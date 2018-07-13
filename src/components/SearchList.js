import React from 'react';

function SearchList(props) {
    let { strAlbum, name, type } = props;
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
            </div>
        );
    }
}

export default SearchList;
