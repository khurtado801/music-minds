import React, { Component } from 'react';
import '../styles/index.css';

class AlbumItem extends Component {
    
	render() {
		let { strAlbum } = this.props;
		return (
			<div className="search-item">
				<div className="search-txt">
					<h4>Album Name: {strAlbum} </h4>
				</div>
			</div>
		);
	}
}

export default AlbumItem;