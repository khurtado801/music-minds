/* eslint-disable */
import React from 'react';
import AlbumItem from './AlbumItem';
import TrackItem from './TrackItem';

function SearchList(props) {
	let { type } = props;

	if (type === 'album') {
		let {
			strAlbum, image, name, lastFmAlbumsLimit
		} = props;

		var albumImg = image[3]['#text']
		return (
			<AlbumItem
				albumImg={albumImg}
				strAlbum={strAlbum ? strAlbum : name}
				lastFmAlbumsLimit={lastFmAlbumsLimit}
			/>
		);
	}

	if (type === 'track') {
		let {
			strAlbum, image, name, artist, lastFmTracksLimit
		} = props;

		var trackImg = image[3]['#text']
		return (
			<TrackItem
				trackImg={trackImg}
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
