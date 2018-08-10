import React, { Component } from 'react';
import '../styles/album-item.css';

class AlbumItem extends Component {
    
	render() {
		let { strAlbum, albumImg } = this.props;
		return (
			<div className="figure">
				<div className="album-img">
					<img className="coverart" src={albumImg} alt="" />
				</div>
				<div className="figcaption">
					<h4>Album name: {strAlbum}</h4>
				</div>
			</div>
		);
	}
}

export default AlbumItem;