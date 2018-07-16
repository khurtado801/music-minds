import React from 'react';

import '../styles/index.css';

function SearchList(props) {
	let {
		strAlbum, name, artist, type 
	} = props;

	if (type === 'album') {
		return (
			<div className="search-item">
				<p className="search-txt">Album Name: {strAlbum ? strAlbum : name}</p>
			</div>
		);
	}
	if (type === 'track') {
		return (
			<div className="search-item">
				<h4 className="search-txt">Track Name: {name}</h4>
				<p className="search-artist-txt">Artist Name: {artist}</p>
			</div>
		);
	}
}

export default SearchList;