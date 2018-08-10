/* eslint-disable */
import React from 'react';
import AlbumItem from './AlbumItem';
import TrackItem from './TrackItem';

function SearchList(props) {
	let {
		strAlbum, image, name, artist, type, lastFmAlbumsLimit, lastFmTracksLimit
	} = props;

	var albumImg = image[3]['#text']

    console.log('SearchListStrAlbum', name);
	if (type === 'album') {
		return (
			<AlbumItem
				albumImg={albumImg}
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
