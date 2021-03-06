import React, { Component } from 'react';
import './app.css';

class Gallery extends Component {

	constructor(props){
		super(props);
		this.state = {
			playingUrl: '',
			audio: null,
			playingFlag: false
		}
	}

	playAudio(previewUrl){
		let audio = new Audio(previewUrl);
		if(!this.state.playingFlag){
			audio.play();
			this.setState({
				playingFlag: true,
				playingUrl: previewUrl,
				audio: audio})
		}
		else{
			if(this.state.playingUrl === previewUrl){
				this.state.audio.pause();
				this.setState({
					playing: false
				})
			}
			else{
				this.state.audio.pause();
				audio.play();
				this.setState({
					playingUrl: previewUrl,
					audio: audio
				})
			}
		}

	}


	render(){

		const { tracks } = this.props;

		return (
			<div>
			 {tracks.map((track, index) => {
			 	const trackImg = track.album.images[0].url;
			 	return(
			 		<div 
				 		key={index} 
				 		className="track"
				 		onClick={() => this.playAudio(track.preview_url)}
				 	>
				 		<img 
				 			src={trackImg}
				 			className="track-img"
				 			alt="track image alt"
				 		/>
				 		<div className="track-play">
				 			<div className="track-play-inner"> 		
				 				{
				 					this.state.playingUrl === track.preview_url 
				 					? <span> | | </span>
				 					: <span> &#9654; </span>

				 				}
				 			</div>
				 		</div>
				 		<p className="track-text">
				 			{track.name}
				 		</p>
				 	</div>
			 		)
			 })}	
			</div>
			)
	}
}

export default Gallery;