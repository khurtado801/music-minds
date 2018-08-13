import React, { Component } from 'react';
import '../styles/track-item.css';

class TrackItem extends Component {
    
	render() {
		let { strAlbum, name, artist, trackImg } = this.props;
		return (
			<div className="figure">
				<div className="track-img">
					<img className="coverart" src={trackImg} alt="No Cover Art Found"/>
					<h4>Artist Name: {artist}</h4>
					<h4>Album Name: {strAlbum}</h4>
				</div>
				<div className="figcaption">
					<h4>Track Name: {name}</h4>
				</div>
			</div>
		);
	}
}

export default TrackItem;