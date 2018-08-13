import React, { Component } from 'react';

import noCoverArt from '../images/imgNotFound.png';
import '../styles/album-item.css';

class AlbumItem extends Component {
	render() {
		let { strAlbum, albumImg } = this.props;
		return (
			<div className="figure">
				<div className="album-img">
					{
						this.props.albumImg !== '' ?
							<img className="coverart" src={albumImg} alt="No Cover Art Found"/>
							:
							<img className="coverart" src={noCoverArt} alt="No Cover Art Found" />
					}
				</div>
				<div className="figcaption">
					<h4>Album name: {strAlbum}</h4>
				</div>
			</div>
		);
	}
}

export default AlbumItem;