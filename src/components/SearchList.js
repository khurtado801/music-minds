import React from 'react';
import AlbumItem from './AlbumItem';
import TrackItem from './TrackItem';

import '../styles/index.css';

function SearchList(props) {
	console.log('props', props);
	let {
		strAlbum, name, artist, type, lastFmAlbumsLimit, lastFmTracksLimit
	} = props;
    
	if (type === 'album') {
		return (
			<AlbumItem
				strAlbum={strAlbum ? strAlbum : name}
				lastFmAlbumsLimit={lastFmAlbumsLimit}
			/>
		);
	}
	if (type === 'track') {
		return (
			<TrackItem
				name={name}
				artist={artist}
				strAlbum={strAlbum}
				strAlbum={name}
				lastFmTracksLimit={lastFmTracksLimit}
			/>
		);
	}
}

export default SearchList;
