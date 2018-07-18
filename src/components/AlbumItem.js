import React, { Component } from 'react';

class AlbumItem extends Component {
    
	render() {
		let { strAlbum } = this.props;
		return (
			<div className="search-item">
				<div className="search-txt">
					<h4>Album: {strAlbum} </h4>
				</div>
			</div>
		);
	}
}

export default AlbumItem;